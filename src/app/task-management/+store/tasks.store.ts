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
                    patchState(store, (state) => ({ tasks: [...state.tasks, ...JSON.parse(localStorage['tasks']).tasks ] }));
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
            
            updateTaskPositions: (taskIdToBeMoved:string, taskIdToBePlaced:string | null, isSameStatus:boolean) => {
                let tasksToUpdate = [...store.tasks()];
                const indexToMove = tasksToUpdate.findIndex(item => item.id === taskIdToBeMoved);
                let indexToBePlaced = tasksToUpdate.findIndex(item => item.id === taskIdToBePlaced);
                if(indexToBePlaced < 0){
                    indexToBePlaced = tasksToUpdate.length;
                }
                
                if(indexToMove < indexToBePlaced && isSameStatus){
                    indexToBePlaced++;
                }

                let placeholder = {};
                // remove the object from its initial position and
                // plant the placeholder object in its place to
                // keep the array length constant
                const taskToMove = tasksToUpdate.splice(indexToMove, 1, placeholder as Task)[0];
                // place the object in the desired position
                tasksToUpdate.splice(indexToBePlaced, 0, taskToMove);
                // take out the temporary object
                tasksToUpdate.splice(tasksToUpdate.indexOf(placeholder as Task), 1);

                patchState(store, (state) => ({
                    tasks: tasksToUpdate
                }));

            },
            setActiveTaskId: (taskId: string) => {
                patchState(store, () => ({ activeTaskId: taskId }));
            }
        }
    }),
    withComputed(({tasks, activeTaskId}, boardsStore = inject(BoardsStore)) => ({
        activeBoardTasks: computed(() => {
           const activeBoardId = boardsStore.activeBoardId();
           if(!activeBoardId) return [];
              return tasks().filter(task => task.boardId === activeBoardId);
        }),
        activeTask: computed(() => tasks().find(task => task.id === activeTaskId()) || null)
    })),
    withHooks({
        onInit(store) {
            store.loadTasks();
        },
    })
 );