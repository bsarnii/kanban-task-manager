import { Component, computed, inject, signal } from '@angular/core';
import { ModalShowService } from '../services/modal-show.service';
import { ColumnComponent } from "../column/column.component";
import { BoardsStore } from '../task-management/+store/boards.store';
import { TasksStore } from '../task-management/+store/tasks.store';
import { Task } from '../types/task.interface';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [ColumnComponent]
})
export class MainComponent {
  constructor(public modalShowService:ModalShowService){}
  boardsStore = inject(BoardsStore);
  tasksStore = inject(TasksStore);

  columnsVM = computed(() => {
    const statuses = this.boardsStore.activeBoard()?.statuses || [];
    return statuses.map((status, index) => ({
      statusId: status.id,
      columnName: status.name,
      tasks: this.tasksStore.tasks().filter(task => task.statusId === status.id),
      color: this.colors[index]
    }))
  })
  draggedTask = signal<Task|null>(null);

  onNewColumnClick(){
    this.modalShowService.openEditBoardModal()
  }

  onNewBoardClick(){
    this.modalShowService.openCreateBoardModal()
  }
  colors=["#49C4E5","#8471F2","#67E2AE","#d6d45a","#e09660","#e0635e","#de5fc7","#5d64de"]
}
