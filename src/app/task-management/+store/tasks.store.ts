import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Task, TaskInputDto } from "src/app/task-management/types/task.interface";
import { BoardsStore } from "./boards.store";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { filter, pipe, switchMap, tap } from "rxjs";
import { TasksDataService } from "./tasks-data.service";
import { tapResponse } from "@ngrx/operators";

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
    withMethods((store, tasksDataService = inject(TasksDataService), boardsStore = inject(BoardsStore)) => {
        const loadTasks = rxMethod<string | null>(pipe(
            filter(Boolean),
            tap(() => patchState(store, () => ({ loading: true }) )),
            switchMap((boardId) => tasksDataService.getAll(boardId).pipe(
                tapResponse(({
                    next: (tasks) => {
                        patchState(store, () => ({ tasks, loading: false, loaded: true }) )
                    },
                    error: () => patchState(store, () => ({ loading: false }) )
                }))
            ))
        ));

        const addTask = rxMethod<TaskInputDto>(pipe(
            tap(() => patchState(store, () => ({ loading: true }) )),
            switchMap((task) => tasksDataService.create(boardsStore.activeBoardId()!, task).pipe(
                tapResponse(({
                    next: (task) => patchState(store, (state) => ({ tasks: [...state.tasks, task], loading: false, loaded: true })),
                    error: () => patchState(store, () => ({ loading: false }) )
                }))
            ))
        ));

        const editTask = rxMethod<{id: string, taskInput: Partial<TaskInputDto>, callback?: VoidFunction}>(pipe(
            tap(() => patchState(store, () => ({ loading: true }) )),
            switchMap(({id, taskInput, callback}) => tasksDataService.update(boardsStore.activeBoardId()!, id, taskInput).pipe(
                tapResponse(({
                    next: (editedTask) => {
                        patchState(store, (state) => ({ 
                            tasks: state.tasks.map(task => task.id === editedTask.id ? editedTask : task), 
                            loading: false
                        }));
                        if(callback) {  
                            callback(); 
                        }
                    },
                    error: () => patchState(store, () => ({ loading: false }) )
                }))
            ))
        ));

        const deleteTask = rxMethod<string>(pipe(
            tap(() => patchState(store, () => ({ loading: true }) )),
            switchMap((taskId) => tasksDataService.delete(boardsStore.activeBoardId()!, taskId).pipe(
                tapResponse(({
                    next: () => patchState(store, (state) => ({ 
                        tasks: state.tasks.filter(task => task.id !== taskId), 
                        loading: false
                    })),
                    error: () => patchState(store, () => ({ loading: false }) )
                }))
            ))
        ));

        const setActiveTaskId = (taskId: string | null) => {
            patchState(store, () => ({ activeTaskId: taskId }));
        }

        const sortTasks = rxMethod<string[]>(pipe(
            tap(() => patchState(store, () => ({ loading: true }) )),
            switchMap((taskIds) => tasksDataService.sortTasks(boardsStore.activeBoardId()!, taskIds).pipe(
                tapResponse(({
                    next: (tasks) => patchState(store, () => ({ tasks, loading: false }) ),
                    error: () => patchState(store, () => ({ loading: false }) )
                }))
            ))
        ));

        const updateTaskPositions = (taskIdToBeMoved:string, taskIdToBePlaced:string | null, isSameStatus:boolean) => {
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

            sortTasks(tasksToUpdate.map(task => task.id));
        }

        const reset = () => patchState(store, () => initialState);

        return { loadTasks, addTask, editTask, deleteTask, updateTaskPositions, setActiveTaskId, reset };

    }),
    withComputed(({tasks, activeTaskId}, boardsStore = inject(BoardsStore)) => ({
        activeBoardTasks: computed(() => {
           const activeBoardId = boardsStore.activeBoardId();
           if(!activeBoardId) return [];
              return tasks().filter(task => task.boardId === activeBoardId);
        }),
        activeTask: computed(() => tasks().find(task => task.id === activeTaskId()) || null),
        activeTaskExists: computed(() => tasks().some(task => task.id === activeTaskId())),
    })),
    withHooks({
        onInit(store, boardsStore = inject(BoardsStore)) {
            store.loadTasks(boardsStore.activeBoardId);
        },
    })
 );