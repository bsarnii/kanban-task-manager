import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Task, TaskInputDto } from "src/app/task-management/types/task.interface";
import { BoardsStore } from "./boards.store";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { filter, map, pipe, switchMap, tap } from "rxjs";
import { TasksDataService } from "./tasks-data.service";

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
    withMethods((store, tasksDataService = inject(TasksDataService)) => {
        return {
            loadTasks: rxMethod<string | null>(pipe(
                filter(Boolean),
                tap(() => patchState(store, () => ({ loading: true }) )),
                switchMap((boardId) => tasksDataService.getAll(boardId).pipe(
                    tap((tasks) => patchState(store, () => ({ tasks, loading: false, loaded: true }) ))
                ))
            )),
            addTask: rxMethod<TaskInputDto>(pipe(
                tap(() => patchState(store, () => ({ loading: true }) )),
                switchMap((task) => tasksDataService.create(task).pipe(
                    tap((task) => patchState(store, (state) => ({ tasks: [task, ...state.tasks], loading: false, loaded: true }))
                )))
            )),
            editTask: rxMethod<Partial<TaskInputDto>>(pipe(
                map((taskInput) => ({id: store.activeTaskId()!, taskInput})),
                tap(() => patchState(store, () => ({ loading: true }) )),
                switchMap(({id, taskInput}) => tasksDataService.update(id, taskInput).pipe(
                    tap((editedTask) => patchState(store, (state) => ({ 
                        tasks: state.tasks.map(task => task.id === editedTask.id ? editedTask : task), 
                        loading: false, 
                        loaded: true
                    })))
                ))
            )),
            deleteTask: rxMethod<string>(pipe(
                tap(() => patchState(store, () => ({ loading: true }) )),
                switchMap((taskId) => tasksDataService.delete(taskId).pipe(
                    tap(() => patchState(store, (state) => ({ 
                        tasks: state.tasks.filter(task => task.id !== taskId), 
                        loading: false
                    })))
                ))
            )),
            
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
            setActiveTaskId: (taskId: string | null) => {
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
        onInit(store, boardsStore = inject(BoardsStore)) {
            store.loadTasks(boardsStore.activeBoardId);
        },
    })
 );