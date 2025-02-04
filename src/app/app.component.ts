import { Component, inject, OnInit } from '@angular/core';
import { SidebarToggleService } from './task-management/layout/sidebar/sidebar-toggle.service';
import { ModalShowService } from './core/services/modal-show.service';
import { BoardAddEditModalComponent } from './task-management/feature/board-add-edit-modal/board-add-edit-modal.component';
import { SidebarComponent } from "./task-management/layout/sidebar/sidebar.component";
import { HeaderComponent } from "./task-management/layout/header/header.component";
import { BoardComponent } from "./task-management/feature/board/board.component";
import { TaskDetailsModalComponent } from "./task-management/feature/task-details-modal/task-details-modal.component";
import { ConfirmDeleteBoardComponent } from "./task-management/ui/confirm-delete-board/confirm-delete-board.component";
import { ConfirmDeleteTaskComponent } from "./task-management/ui/confirm-delete-task/confirm-delete-task.component";
import { BoardsStore } from './task-management/+store/boards.store';
import { TasksStore } from './task-management/+store/tasks.store';
import { TaskAddEditModalComponent } from './task-management/feature/task-add-edit-modal/task-add-edit-modal.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet,BoardAddEditModalComponent, SidebarComponent, HeaderComponent, BoardComponent, TaskDetailsModalComponent, TaskAddEditModalComponent, ConfirmDeleteBoardComponent, ConfirmDeleteTaskComponent],
    standalone: true
})
export class AppComponent implements OnInit {
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
