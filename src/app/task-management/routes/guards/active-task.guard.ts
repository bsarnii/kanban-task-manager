import { inject } from "@angular/core";
import { TasksStore } from "../../+store/tasks.store";
import { CanActivateFn } from "@angular/router";

export const activeTaskGuard: CanActivateFn = (route, state) => {
    const tasksStore = inject(TasksStore);
    const taskId = route.params['taskId'] as string;
    tasksStore.setActiveTaskId(taskId);

    return true ;
  };