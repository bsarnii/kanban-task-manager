import { inject } from "@angular/core";
import { TasksStore } from "../../+store/tasks.store";
import { CanActivateFn, CanDeactivateFn } from "@angular/router";

export const activeTaskOnActivate: CanActivateFn = (route, state) => {
    const tasksStore = inject(TasksStore);
    const taskId = route.params['taskId'] as string;
    tasksStore.setActiveTaskId(taskId);

    return true ;
};

export const activeTaskOnDeactivate: CanDeactivateFn<unknown> = () => {
  const tasksStore = inject(TasksStore);
  tasksStore.setActiveTaskId(null);

  return true;
}