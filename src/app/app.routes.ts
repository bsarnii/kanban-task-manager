import { Routes } from "@angular/router";
import { TaskManagementComponent } from "./task-management/task-management.component";
import { taskMangagementRoutes } from "./task-management/routes/routes";

const appRoutes: Routes = [
    {
      path: '',
      component: TaskManagementComponent,
      title: 'Task management',
      children: [
        ...taskMangagementRoutes
      ]
    },
  ];
  export default appRoutes;