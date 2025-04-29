import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { TasksStore } from "../../+store/tasks.store";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter } from "rxjs";

export const tasksLoaded: CanActivateFn = () => {
    const tasksStore = inject(TasksStore);
    const tasksLoaded$ = toObservable(tasksStore.loaded);
    return tasksLoaded$.pipe(filter(Boolean));
};