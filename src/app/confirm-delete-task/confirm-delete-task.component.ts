import { Component, inject } from '@angular/core';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsService } from '../services/boards.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { TasksStore } from '../task-management/+store/tasks.store';

//TODO: Make this component dumb
@Component({
    selector: 'app-confirm-delete-task',
    templateUrl: './confirm-delete-task.component.html',
    styleUrls: ['./confirm-delete-task.component.scss']
})
export class ConfirmDeleteTaskComponent {
  tasksStore = inject(TasksStore);
  constructor(
    public modalShowService:ModalShowService,
    public sidebarService: SidebarToggleService
    ) {}

  deleteTask(){
    this.tasksStore.deleteTask(this.tasksStore.activeTaskId()!);
    this.modalShowService.closeModal();
  }

  cancelDelete(){
    this.modalShowService.closeModal()
  }
}
