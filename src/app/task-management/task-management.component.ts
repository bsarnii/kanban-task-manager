import { Component, inject } from '@angular/core';
import { ModalShowService } from '../core/services/modal-show.service';
import { BoardsStore } from './+store/boards.store';
import { TasksStore } from './+store/tasks.store';
import { SidebarToggleService } from './layout/sidebar/sidebar-toggle.service';
import { HeaderComponent } from "./layout/header/header.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { TaskAddEditModalComponent } from "./feature/task-add-edit-modal/task-add-edit-modal.component";
import { BoardAddEditModalComponent } from "./feature/board-add-edit-modal/board-add-edit-modal.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-management',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, TaskAddEditModalComponent, BoardAddEditModalComponent],
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
