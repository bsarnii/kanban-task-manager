import { Component, inject, Input, model, output } from '@angular/core';
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
    return subtasks.filter(subtask => subtask.completed === true).length
  }

  // Drag and drop
  onDragOver(e:DragEvent){
    e.preventDefault();
  }

  onDragStart(task:Task){
    this.draggedTask.set(task);
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
      this.draggedTask.set(null);
    }
  }
      
}
