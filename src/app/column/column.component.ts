import { Component, Input} from '@angular/core';
import { Task, Subtask } from '../types/boards.interface';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsService } from '../services/boards.service';
import { DragDropService } from '../services/drag-drop.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent{

  constructor(
    public modalShowService: ModalShowService,
    public boardsService: BoardsService,
    public dragDropService: DragDropService
    ) {}

  @Input() color:string = "#49C4E5";
  @Input() columnName:string = "TODO";
  @Input() taskNumber:number = 0;
  @Input() tasks:Array<Task>= [];
  @Input() columnIndex:number = 0;

  onTaskClick(i:number){
    this.boardsService.setCurrentTask(this.tasks[i])
    this.modalShowService.openTaskModal()
    this.boardsService.indexes.columnIndex = this.columnIndex;
    this.boardsService.indexes.taskIndex = i;
    }

  filterCompletedTasks(subtasks: Array<Subtask>):number{
    return subtasks.filter(subtask => subtask.isCompleted === true).length
  }

  // Drag and drop

  onDragStart(e:DragEvent, item:Task, i:number){
    this.boardsService.indexes.columnIndex = this.columnIndex;
    this.boardsService.indexes.taskIndex = i;
    this.dragDropService.dragStart(e,item);
  }

  onDrop(e:DragEvent){
    this.boardsService.indexes.dropColumnIndex = this.columnIndex;
    this.dragDropService.drop(e)
  }
}
