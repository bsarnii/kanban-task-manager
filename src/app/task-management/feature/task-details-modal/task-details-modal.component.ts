import { Component, computed, inject, input } from '@angular/core';
import { ModalShowService } from '../../../core/services/modal-show.service';
import { TasksStore } from '../../+store/tasks.store';
import { Task, Subtask } from '../../types/task.interface';
import { Status } from '../../types/status.interface';

@Component({
    selector: 'app-task-details-modal',
    templateUrl: './task-details-modal.component.html',
    styleUrls: ['./task-details-modal.component.scss'],
    imports: []
})
export class TaskDetailsModalComponent {
  tasksStore = inject(TasksStore);
  modalShowService = inject(ModalShowService);

  task = input.required<Task>();
  statuses = input.required<Status[]>();
  
  completedSubtasks = computed(() => this.task().subtasks.filter(subtask => subtask.isCompleted));
  showEditDeleteOverlay = false;

  toggleEditDeleteOverlay(){
    this.showEditDeleteOverlay = !this.showEditDeleteOverlay;
  }

  handleCheckboxClick(subtask:Subtask){
    const isCompleted = !subtask.isCompleted;
    this.tasksStore.editTask({
      ...this.task(),
      subtasks: this.task().subtasks.map(item => {
        if(item.id === subtask.id){
          return {...item, isCompleted};
        }
        return item;
      })
    })
  }

  changeStatus(statusId:string){
    this.tasksStore.editTask({
      ...this.task(),
      statusId
    })
    this.modalShowService.closeModal();
  }
}


