import { Component, computed, inject, input } from '@angular/core';
import { ModalShowService } from '../services/modal-show.service';
import { TasksStore } from '../task-management/+store/tasks.store';
import { Task, Subtask } from '../types/task.interface';
import { Status } from '../types/status.interface';

//TODO: Make this component dumb, rename it to TaskDetailsModalComponent
@Component({
    selector: 'app-task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss'],
    imports: []
})
export class TaskModalComponent {
  tasksStore = inject(TasksStore);
  modalShowService = inject(ModalShowService);

  task = input.required<Task>();
  statuses = input.required<Status[]>();
  
  completedSubtasks = computed(() => this.task().subtasks.filter(subtask => subtask.isCompleted));
  showEditDeleteContainer = false;

  openEditDeleteContainer(){
    this.showEditDeleteContainer = !this.showEditDeleteContainer;
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

  openDeleteTaskModal(){
    this.modalShowService.openDeleteTaskModal()
  }
}


