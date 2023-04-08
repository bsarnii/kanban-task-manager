import { Component, Input } from '@angular/core';
import { Task, Subtask } from '../types/boards.interface';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {

constructor(
  public modalShowService: ModalShowService,
  public boardsService: BoardsService,
  ) {}

@Input() color:string = "#49C4E5";
@Input() columnName:string = "TODO";
@Input() taskNumber:number = 0;
@Input() tasks:Array<Task>= [];
@Input() columnIndex:number = 0;

onTaskClick(i:number){
  this.boardsService.setCurrentTask(this.tasks[i])
  this.modalShowService.openTaskModal()
  console.log(this.boardsService.currentTask)
  this.boardsService.indexes.columnIndex = this.columnIndex;
  this.boardsService.indexes.taskIndex = i;
}

filterCompletedTasks(subtasks: Array<Subtask>):number{
  return subtasks.filter(subtask => subtask.isCompleted === true).length
}

}
