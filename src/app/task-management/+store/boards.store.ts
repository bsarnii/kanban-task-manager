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
    withMethods((store) => ({
        loadBoards: () => {
            const localStorageBoards = localStorage['boards'];
            if(localStorageBoards) {
                patchState(store, () => ({ loading: true }));
                patchState(store, (state) => ({ boards: [...state.boards, ...JSON.parse(localStorage['boards']).boards ]}));
                patchState(store, () => ({ loading: false, loaded: true }));
            }
        }
    })),
    withHooks({
        onInit(store) {
            store.loadBoards();
        },
    })
  );