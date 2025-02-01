import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Board } from '../../types/boards.interface';
import { computed } from '@angular/core';

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
                patchState(store, (state) => ({ boards: [board, ...state.boards] }));
                saveToLocalStorage();
            },
            editBoard: (editedBoard: Board) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.id === editedBoard.id) {
                        return editedBoard;
                    }
                    return board;
                }) }));
                saveToLocalStorage();
            },
            deleteBoard: (id: string) => {
                patchState(store, (state) => ({ boards: state.boards.filter(board => board.id !== id) }))
                saveToLocalStorage();
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
            if(!store.activeBoard() && store.boards().length) {
                store.setActiveBoardId(store.boards()[0].id);
            }
        },
    })
  );