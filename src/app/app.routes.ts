import { Routes } from "@angular/router";
import { TaskManagementComponent } from "./task-management/task-management.component";
import { taskMangagementRoutes } from "./task-management/routes/routes";
import { loginNotRequiredGuard } from "./core/guards/login-not-required.guard";
import { requireLoginGuard } from "./core/guards/require-login.guard";

const appRoutes: Routes = [
    {
      path: '',
      title: 'Kanban Task Manager',
      loadComponent: () => import('./home/feature/home-page/home-page.component').then(m => m.HomePageComponent),
    },
    {
      path: 'board',
      component: TaskManagementComponent,
      title: 'Task management',
      children: [
        ...taskMangagementRoutes
      ],
      canActivate: [requireLoginGuard]
    },
    {
      path: 'auth',
      loadChildren: () => import('app/auth/routes/routes').then(m => m.authRoutes),
      canActivate: [loginNotRequiredGuard]
    }
  ];
  export default appRoutes;