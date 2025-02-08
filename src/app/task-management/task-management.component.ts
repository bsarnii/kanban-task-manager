import { Component, inject } from '@angular/core';
import { ModalShowService } from '../core/services/modal-show.service';
import { BoardsStore } from './+store/boards.store';
import { TasksStore } from './+store/tasks.store';
import { SidebarToggleService } from './layout/sidebar/sidebar-toggle.service';
import { TaskDetailsModalComponent } from "./feature/task-details-modal/task-details-modal.component";
import { HeaderComponent } from "./layout/header/header.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { TaskAddEditModalComponent } from "./feature/task-add-edit-modal/task-add-edit-modal.component";
import { ConfirmDeleteBoardComponent } from "./ui/confirm-delete-board/confirm-delete-board.component";
import { ConfirmDeleteTaskComponent } from "./ui/confirm-delete-task/confirm-delete-task.component";
import { BoardAddEditModalComponent } from "./feature/board-add-edit-modal/board-add-edit-modal.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-management',
  imports: [RouterOutlet,TaskDetailsModalComponent, HeaderComponent, SidebarComponent, TaskAddEditModalComponent, ConfirmDeleteBoardComponent, ConfirmDeleteTaskComponent, BoardAddEditModalComponent],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.scss'
})
export class TaskManagementComponent {
  sidebarService = inject(SidebarToggleService);
  modalShowService = inject(ModalShowService);
  boardsStore = inject(BoardsStore);
  tasksStore = inject(TasksStore);

  ngOnInit(){
    if (window.innerWidth <= 575){
      this.sidebarService.sidebarOpened = false;
    }
  }
}
