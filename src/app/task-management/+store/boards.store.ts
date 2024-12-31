import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Board, Task } from '../../types/boards.interface';
import { computed } from '@angular/core';

type BoardsState = { 
    boards: Board[],
    activeBoardId: string | null,
    activeTaskId: string | null,
    loading: boolean,
    loaded: boolean
};

const initialState: BoardsState = {
    boards: [],
    activeBoardId: null,
    activeTaskId : null,
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
            setActiveBoardId: (id: string) => {
                console.log('active board', id);
                patchState(store, () => ({ activeBoardId: id }) );
            },
            //Task methods
            //TODO: Move tasks to a different store
            addTask: (task: Task, status:string) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.id === state.activeBoardId) {
                        return { ...board, columns: board.columns.map(col => {
                            if(col.name === status) {
                                return { ...col, tasks: [...col.tasks, task] };
                            }
                            return col;
                        }) };
                    }
                    return board;
                }) }));
                saveToLocalStorage();
            },
            editTask: (editedTask: Task, status: string) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.id === state.activeBoardId) {
                        return { ...board, columns: board.columns.map(col => {
                            if(col.name === status) {
                                return { ...col, tasks: col.tasks.map(task => {
                                    if(task.title === editedTask.title) {
                                        return editedTask;
                                    }
                                    return task;
                                }) };
                            }
                            return col;
                        }) };
                    }
                    return board;
                }) }));
                saveToLocalStorage();
            },
            deleteTask: (taskToBeDeleted: Task, status: string) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.id === state.activeBoardId) {
                        return { ...board, columns: board.columns.map(col => {
                            if(col.name === status) {
                                return { ...col, tasks: col.tasks.filter(task => task.title !== taskToBeDeleted.title) };
                            }
                            return col;
                        }) };
                    }
                    return board;
                }) }));
                saveToLocalStorage();
            },
            setActiveTaskId: (taskId: string) => {
                patchState(store, () => ({ activeTaskId: taskId }));
            }
        }
    }),
    withComputed(({boards, activeBoardId}) => ({
        activeBoard: computed(() => {
            return boards().find(board => board.id === activeBoardId()) || null;
        })

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