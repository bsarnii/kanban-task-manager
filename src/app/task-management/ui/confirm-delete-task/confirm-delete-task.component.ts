import { Component, inject } from '@angular/core';
import { ModalShowService } from '../../../core/services/modal-show.service';
import { SidebarToggleService } from '../../layout/sidebar/sidebar-toggle.service';
import { TasksStore } from '../../+store/tasks.store';

//TODO: Make this component dumb
@Component({
    selector: 'app-confirm-delete-task',
    templateUrl: './confirm-delete-task.component.html',
    styleUrls: ['./confirm-delete-task.component.scss']
})
export class ConfirmDeleteTaskComponent {
  tasksStore = inject(TasksStore);
  modalShowService = inject(ModalShowService);
  sidebarService = inject(SidebarToggleService);

  deleteTask(){
    this.tasksStore.deleteTask(this.tasksStore.activeTaskId()!);
    this.modalShowService.closeModal();
  }

  cancelDelete(){
    this.modalShowService.closeModal()
  }
}
