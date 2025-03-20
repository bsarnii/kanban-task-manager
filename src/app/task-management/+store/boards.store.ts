import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Board } from '../types/boards.interface';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, switchMap, tap } from 'rxjs';
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
        /*const saveToLocalStorage = () => {
            localStorage.setItem('boards', JSON.stringify({ boards: store.boards() }));
        };*/
        return {
            loadBoards: rxMethod<void>(pipe(
                tap(() => patchState(store, () => ({ loading: true }))),
                switchMap(() => boardsDataService.getAll().pipe(
                    tap(boards => {
                        patchState(store, () => ({ boards, loading: false, loaded: true }));
                    })
                ))
            )),
            /*loadBoards: () => {
                const localStorageBoards = localStorage['boards'];
                if(localStorageBoards) {
                    patchState(store, () => ({ loading: true }));
                    patchState(store, (state) => ({ boards: [...state.boards, ...JSON.parse(localStorage['boards']).boards ]}));
                    patchState(store, () => ({ loading: false, loaded: true }));
                }
            },*/
            addBoard: (board: Board) => {
                patchState(store, (state) => ({ boards: [board, ...state.boards] }));
                //saveToLocalStorage();
                router.navigate(['/board', board.id]);
            },
            editBoard: (editedBoard: Board) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.id === editedBoard.id) {
                        return editedBoard;
                    }
                    return board;
                }) }));
               // saveToLocalStorage();
            },
            deleteBoard: (id: string) => {
                patchState(store, (state) => ({ boards: state.boards.filter(board => board.id !== id) }))
               // saveToLocalStorage();
                router.navigate(['/board']);
            },
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