import { Routes } from "@angular/router";
import { BoardComponent } from "./task-management/feature/board/board.component";
import { TaskManagementComponent } from "./task-management/task-management.component";

const appRoutes: Routes = [
    {
      path: '',
      component: TaskManagementComponent,
      title: 'Board overview',
    },
    /*{
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details',
    },*/
  ];
  export default appRoutes;