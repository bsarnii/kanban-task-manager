import { Routes } from "@angular/router";
import { BoardComponent } from "./task-management/feature/board/board.component";

const routeConfig: Routes = [
    {
      path: '',
      component: BoardComponent,
      title: 'Board overview',
    },
    /*{
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details',
    },*/
  ];
  export default routeConfig;