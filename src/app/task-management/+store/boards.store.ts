import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Board, Task } from '../../types/boards.interface';

type BoardsState = { 
    boards: Board[],
    currentBoard: Board | null,
    currentTask: Task | null,
    loading: boolean,
    loaded: boolean
};

const initialState: BoardsState = {
    boards: [],
    currentBoard: null,
    currentTask : null,
    loading: false,
    loaded: false
 };

 export const BoardsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
        const saveToLocalStorage = () => {
            localStorage.setItem('boards', JSON.stringify({ boards: store.boards() }));
        };
        return {
            loadBoards: () => {
                const localStorageBoards = localStorage['boards'];
                if(localStorageBoards) {
                    patchState(store, () => ({ loading: true }));
                    patchState(store, (state) => ({ boards: [...state.boards, ...JSON.parse(localStorage['boards']).boards ]}));
                    patchState(store, () => ({ loading: false, loaded: true }));
                }
            },
            addBoard: (board: Board) => {
                patchState(store, (state) => ({ boards: [...state.boards, board] }));
                saveToLocalStorage();
            },
            editBoard: (editedBoard: Board) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.name === editedBoard.name) {
                        return editedBoard;
                    }
                    return board;
                }) }));
                saveToLocalStorage();
            },
            deleteBoard: (boardToBeDeleted: Board) => {
                patchState(store, (state) => ({ boards: state.boards.filter(board => board.name !== boardToBeDeleted.name) }))
                saveToLocalStorage();
            },
            setActiveBoard: (board: Board) => {
                patchState(store, () => ({ currentBoard: board }));
            }
    }
    }),
    withHooks({
        onInit(store) {
            store.loadBoards();
        },
    })
  );