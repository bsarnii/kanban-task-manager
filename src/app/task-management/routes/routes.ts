import { Routes } from "@angular/router";
import { doesBoardExistsGuard } from "./guards/does-board-exists.guard";
import { activeBoardGuard } from "./guards/active-board.guard";
import { BoardComponent } from "../feature/board/board.component";
import { BoardNotExistsComponent } from "../feature/board-not-exists/board-not-exists.component";
import { TaskDetailsModalComponent } from "../feature/task-details-modal/task-details-modal.component";
import { activeTaskOnActivate, activeTaskOnDeactivate } from "./guards/active-task.guard";
import { BoardAddEditModalComponent, BoardAddEditModalContextEnum } from "../feature/board-add-edit-modal/board-add-edit-modal.component";
import { TaskAddEditModalComponent, TaskAddEditModalContextEnum } from "../feature/task-add-edit-modal/task-add-edit-modal.component";
import { loadBoardsGuard } from "./guards/load-boards.guard";

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
        canActivate: [loadBoardsGuard, doesBoardExistsGuard],
        component: BoardNotExistsComponent,
        children: [
            {
                path: 'add-board',
                component: BoardAddEditModalComponent,
                data: { addEditContext: BoardAddEditModalContextEnum.add }
            }
        ]
    },
    {
        path: 'board/:boardId',
        component: BoardComponent,
        canActivate: [loadBoardsGuard, activeBoardGuard],
        children: [
            {
                path: 'task/:taskId',
                component: TaskDetailsModalComponent,
                canActivate: [activeTaskOnActivate],
                canDeactivate: [activeTaskOnDeactivate],
                children: [
                    {
                        path: 'edit-task',
                        component: TaskAddEditModalComponent,
                        data: { addEditContext: TaskAddEditModalContextEnum.edit }
                    }
                ]
            },
            {
                path: 'add-board',
                component: BoardAddEditModalComponent,
                data: { addEditContext: BoardAddEditModalContextEnum.add }
            },
            {
                path: 'edit-board',
                component: BoardAddEditModalComponent,
                data: { addEditContext: BoardAddEditModalContextEnum.edit }
            },
            {
                path: 'add-task',
                component: TaskAddEditModalComponent,
                data: { addEditContext: TaskAddEditModalContextEnum.add }
            }
        ]
    },

];