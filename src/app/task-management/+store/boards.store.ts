import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Board, BoardInputDto } from '../types/boards.interface';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, pipe, switchMap, tap } from 'rxjs';
import { BoardsDataService } from './boards-data.service';

type BoardsState = { 
    boards: Board[],
    activeBoardId: string | null,
    loading: boolean,
    loaded: boolean
};

const initialState: BoardsState = {
    boards: [],
    activeBoardId: null,
    loading: false,
    loaded: false
 };

 export const BoardsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, router = inject(Router), boardsDataService = inject(BoardsDataService)) => {
        return {
            loadBoards: rxMethod<void>(pipe(
                tap(() => patchState(store, () => ({ loading: true }))),
                switchMap(() => boardsDataService.getAll().pipe(
                    tap(boards => {
                        patchState(store, () => ({ boards, loading: false, loaded: true }));
                    })
                ))
            )),
            addBoard: rxMethod<BoardInputDto>(pipe(
                tap(() => patchState(store, () => ({ loading: true }))),
                switchMap((boardInput) => boardsDataService.create(boardInput).pipe(
                    tap(board => {
                        patchState(store, () => ({ boards: [...store.boards(), board], loading: false }));
                        router.navigate(['/board', board.id]);
                    })
                ))
            )),
            editBoard: rxMethod<Partial<BoardInputDto>>(pipe(
                map((boardInput) => ({id: store.activeBoardId()!, boardInput})),
                tap(() => patchState(store, () => ({ loading: true }))),
                switchMap(({id, boardInput}) => boardsDataService.update(id, boardInput).pipe(
                    tap(responseBoard => {
                        patchState(store, () => ({ 
                            boards: store.boards().map(board => board.id === id ? responseBoard : board), loading: false 
                        }));
                    })
                ))
            )),
            deleteBoard: rxMethod<string>(pipe(
                filter(Boolean),
                tap(() => patchState(store, () => ({ loading: true }))),
                switchMap(id => boardsDataService.delete(id).pipe(
                    tap(() => {
                        patchState(store, (state) => ({ boards: state.boards.filter(board => board.id !== id) }))
                         router.navigate(['/board']);
                    })
                ))

            )),
            setActiveBoardId: (id: string | null) => {
                patchState(store, () => ({ activeBoardId: id }) );
            },
            
        }
    }),
    withComputed(({boards, activeBoardId}) => ({
        activeBoard: computed(() => {
            return boards().find(board => board.id === activeBoardId()) || null;
        }),
        activeBoardStatuses: computed(() => boards().find(board => board.id === activeBoardId())?.statuses || [])

    })),
    withHooks({
        onInit(store) {
            store.loadBoards();
        },
    })
  );