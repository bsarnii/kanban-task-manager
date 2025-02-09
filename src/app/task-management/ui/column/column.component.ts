import { Component, ElementRef, inject, Input, model, output, QueryList, ViewChildren } from '@angular/core';

import { ModalShowService } from '../../../core/services/modal-show.service';
import { CommonModule } from '@angular/common';
import { TasksStore } from '../../+store/tasks.store';
import { Subtask, Task } from '../../types/task.interface';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
    imports: [CommonModule]
})
export class ColumnComponent{
  modalShowService = inject(ModalShowService);
  tasksStore = inject(TasksStore);

  @Input() color:string = "#49C4E5";
  @Input() columnName:string = "TODO";
  @Input() taskNumber:number = 0;
  @Input() tasks:Array<Task>= [];
  @Input() columnIndex:number = 0;
  @Input() statusId = "";
  
  taskClick = output<string>();
  draggedTask = model<Task | null>();


  filterCompletedSubtasks(subtasks: Subtask[]):number{
    return subtasks.filter(subtask => subtask.isCompleted === true).length
  }

  // Drag and drop
  onDragOver(e:DragEvent){
    e.preventDefault();
  }

  onDragStart(task:Task){
    this.draggedTask.set(task);
  }

  onDragEnd(){
   this.draggedTask.set(null);
  }

  onDrop(e:DragEvent){
    const task = this.draggedTask();
    if(task) {
      const targetId = (e.target as HTMLDivElement)?.id || null;
      const isSameStatus = this.statusId === task.statusId;

      this.tasksStore.editTask({
        ...task,
        statusId: this.statusId
      });

      this.tasksStore.updateTaskPositions(task.id, targetId, isSameStatus);

    }
  }
      
}
