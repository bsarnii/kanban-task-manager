import { Component, ElementRef, inject, Input, model, QueryList, ViewChildren } from '@angular/core';

import { ModalShowService } from '../services/modal-show.service';
import { CommonModule } from '@angular/common';
import { TasksStore } from '../task-management/+store/tasks.store';
import { Subtask, Task } from '../types/task.interface';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
    imports: [CommonModule]
})
export class ColumnComponent{

  constructor(
    public modalShowService: ModalShowService
    ) {

    }

  tasksStore = inject(TasksStore);

  @Input() color:string = "#49C4E5";
  @Input() columnName:string = "TODO";
  @Input() taskNumber:number = 0;
  @Input() tasks:Array<Task>= [];
  @Input() columnIndex:number = 0;
  @Input() statusId = "";
  
  draggedTask = model<Task | null>();
  @ViewChildren('taskEl') taskElements!: QueryList<ElementRef>;
  

  onTaskClick(id:string){
    this.tasksStore.setActiveTaskId(id);
    this.modalShowService.openTaskModal()
    }

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
