import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Task } from "src/app/types/task.interface";
import { BoardsStore } from "./boards.store";

type TasksState = { 
    tasks: Task[],
    activeTaskId: string | null,
    loading: boolean,
    loaded: boolean
};

const initialState: TasksState = {
    tasks: [],
    activeTaskId : null,
    loading: false,
    loaded: false
 };

 export const TasksStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => {
        const saveToLocalStorage = () => {
            localStorage.setItem('tasks', JSON.stringify({ tasks: store.tasks() }));
        };
        return {
            loadTasks: () => {
                const localStorageTasks = localStorage['tasks'];
                if(localStorageTasks) {
                    patchState(store, () => ({ loading: true }));
                    patchState(store, (state) => ({ tasks: [...state.tasks, ...JSON.parse(localStorage['tasks']).tasks ]}));
                    patchState(store, () => ({ loading: false, loaded: true }));
                }
            },
            addTask: (task: Task) => {
                patchState(store, (state) => ({tasks: [task, ...state.tasks] }));
                saveToLocalStorage();
            },
            editTask: (taskToBeEdited: Task ) => {
                patchState(store, (state) => ({ 
                    tasks: state.tasks.map(task => {
                        if(task.id === taskToBeEdited.id) {
                            return taskToBeEdited;
                        }
                        return task;
                    })
                }));
                saveToLocalStorage();
            },
            deleteTask: (taskId: string) => {
                patchState(store, (state) => ({ 
                    tasks: state.tasks.filter(task => task.id !== taskId)
                 }));
                saveToLocalStorage();
            },
            setActiveTaskId: (taskId: string) => {
                patchState(store, () => ({ activeTaskId: taskId }));
            }
        }
    }),
    withComputed(({tasks}, boardsStore = inject(BoardsStore)) => ({
        activeBoardTasks: computed(() => {
           const activeBoardId = boardsStore.activeBoardId();
           if(!activeBoardId) return [];
              return tasks().filter(task => task.boardId === activeBoardId);
        })
    })),
    withHooks({
        onInit(store) {
            store.loadTasks();
        },
    })
 );