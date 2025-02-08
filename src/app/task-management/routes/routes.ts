import { Routes } from "@angular/router";
import { doesBoardExistsGuard } from "./guards/does-board-exists.guard";
import { activeBoardGuard } from "./guards/active-board.guard";
import { BoardComponent } from "../feature/board/board.component";
import { BoardNotExistsComponent } from "../feature/board-not-exists/board-not-exists.component";

export const taskMangagementRoutes:Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'board-not-exists'
    },
    {
        path: 'board',
        pathMatch: 'full',
        redirectTo: 'board-not-exists'
    },
    {
        path: 'board-not-exists',
        canActivate: [doesBoardExistsGuard],
        component: BoardNotExistsComponent
    },
    {
        path: 'board/:boardId',
        component: BoardComponent,
        canActivate: [activeBoardGuard]
    },

];