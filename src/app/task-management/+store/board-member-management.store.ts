import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, filter, pipe, switchMap, tap } from 'rxjs';
import { BoardMember, BoardMemberRole } from '../types/board-member.interface';
import { BoardMembersDataService } from './board-members-data.service';
import { BoardsStore } from './boards.store';

type BoardMemberManagementState = {
	boardMembers: BoardMember[];
	loading: boolean;
	loaded: boolean;
};

const initialState: BoardMemberManagementState = {
	boardMembers: [],
	loading: false,
	loaded: false,
};

export const BoardMemberManagementStore = signalStore(
	withState(initialState),
	withMethods((store, boardMembersDataService = inject(BoardMembersDataService), boardsStore = inject(BoardsStore)) => {
		const loadBoardMembers = rxMethod<string | null>(pipe(
			filter(Boolean),
			tap(() => patchState(store, () => ({ loading: true }))),
			switchMap((boardId) => boardMembersDataService.getAll(boardId).pipe(
				tap((boardMembers) => patchState(store, () => ({ boardMembers, loading: false, loaded: true }))),
				catchError(() => {
					patchState(store, () => ({ loading: false }));
					return EMPTY;
				}),
			)),
		));

		const addMember = rxMethod<{ email: string; role: BoardMemberRole, callback: (success: boolean) => void }>(pipe(
			tap(() => patchState(store, () => ({ loading: true }))),
			switchMap(({ email, role, callback }) => boardMembersDataService.add(boardsStore.activeBoardId()!, email, role).pipe(
				tap((boardMember) => {
					patchState(store, (state) => ({
						boardMembers: [...state.boardMembers, boardMember],
						loading: false,
						loaded: true,
					}));
					callback(true);
				}),
				catchError(() => {
					patchState(store, () => ({ loading: false }));
					callback(false);
					return EMPTY;
				}),
			)),
		));

		const updateMemberRole = rxMethod<{ id: string; role: BoardMemberRole }>(pipe(
			tap(() => patchState(store, () => ({ loading: true }))),
			switchMap(({ id, role }) => boardMembersDataService.updateRole(boardsStore.activeBoardId()!, id, role).pipe(
				tap((updatedBoardMember) => patchState(store, (state) => ({
					boardMembers: state.boardMembers.map((member) =>
						member.id === id ? updatedBoardMember : member,
					),
					loading: false,
				}))),
				catchError(() => {
					patchState(store, () => ({ loading: false }));
					return EMPTY;
				}),
			)),
		));

		const deleteMember = rxMethod<string>(pipe(
			filter(Boolean),
			tap(() => patchState(store, () => ({ loading: true }))),
			switchMap((id) => boardMembersDataService.delete(boardsStore.activeBoardId()!, id).pipe(
				tap(() => patchState(store, (state) => ({
					boardMembers: state.boardMembers.filter((member) => member.id !== id),
					loading: false,
				}))),
				catchError(() => {
					patchState(store, () => ({ loading: false }));
					return EMPTY;
				}),
			)),
		));

		const reset = () => patchState(store, () => initialState);

		return {
			loadBoardMembers,
			addMember,
			updateMemberRole,
			deleteMember,
			reset,
		};
	}),
	withComputed(({ boardMembers }) => ({
		owners: computed(() => boardMembers().filter((member) => member.role === 'owner')),
		sortedBoardMembers: computed(() => {
			const roleOrder: Record<BoardMemberRole, number> = {
				owner: 0,
				editor: 1,
				viewer: 1,
			};
			return [...boardMembers()].sort((a, b) => {
				const roleDiff = roleOrder[a.role] - roleOrder[b.role];
				if (roleDiff !== 0) return roleDiff;
				return a.email.localeCompare(b.email);
			});
		}),
		boardMemberEmails: computed(() => boardMembers().map(member => member.email)),
	})),
	withHooks({
		onInit(store, boardsStore = inject(BoardsStore)) {
			store.loadBoardMembers(boardsStore.activeBoardId);
		},
	}),
);
