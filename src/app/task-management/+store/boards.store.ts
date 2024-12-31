import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Board, Task } from '../../types/boards.interface';

type BoardsState = { 
    boards: Board[],
    activeBoard: Board | null,
    activeTask: Task | null,
    loading: boolean,
    loaded: boolean
};

const initialState: BoardsState = {
    boards: [],
    activeBoard: null,
    activeTask : null,
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
            setActiveBoard: (id: string) => {
                patchState(store, (state) => ({ activeBoard: state.boards.find(board => board.id === id) || null }) );
            },
            //Task methods
            //TODO: Move tasks to a different store
            addTask: (task: Task, status:string) => {
                patchState(store, (state) => ({ boards: state.boards.map(board => {
                    if(board.id === state.activeBoard?.id) {
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
                    if(board.id === state.activeBoard?.id) {
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
                    if(board.id === state.activeBoard?.id) {
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
            setActiveTask: (task: Task) => {
                patchState(store, () => ({ activeTask: task }));
            }
        }
    }),
    withHooks({
        onInit(store) {
            store.loadBoards();
        },
    })
  );