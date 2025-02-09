import { Component, computed, inject, input, Signal } from '@angular/core';
import { ModalShowService } from '../../../core/services/modal-show.service';
import { TasksStore } from '../../+store/tasks.store';
import { Task, Subtask } from '../../types/task.interface';
import { Status } from '../../types/status.interface';
import { BoardsStore } from '../../+store/boards.store';
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-task-details-modal',
    templateUrl: './task-details-modal.component.html',
    styleUrls: ['./task-details-modal.component.scss'],
    imports: [ModalComponent]
})
export class TaskDetailsModalComponent {
  tasksStore = inject(TasksStore);
  boardsStore = inject(BoardsStore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  modalShowService = inject(ModalShowService);

  task = this.tasksStore.activeTask as Signal<Task>;
  statuses = this.boardsStore.activeBoardStatuses;
  
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
    this.close();
  }

  close(){
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}


