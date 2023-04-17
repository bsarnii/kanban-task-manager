import { Component, Input } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalShowService } from 'src/app/services/modal-show.service';

@Component({
  selector: 'app-task-modal-frame',
  templateUrl: './task-modal-frame.component.html',
  styleUrls: ['./task-modal-frame.component.scss']
})
export class TaskModalFrameComponent {

  constructor(public boardsService:BoardsService, public modalShowService:ModalShowService){}

  @Input() modalName:string = "";
  @Input() titleValue:string = "";
  @Input() descriptionValue:string = "";
  @Input() subtasks:any = [];
  @Input() statusValues:any = [];
  @Input() buttonName:string = "";

  indexes = this.boardsService.indexes;

  removeSubtask(subtaskIndex:number,event:Event){
    event.preventDefault()
    this.subtasks.splice(subtaskIndex,1)
  }
  addNewSubtask(event:Event){
    event.preventDefault()
    this.subtasks.push({title:"",isCompleted:false})
  }
  
  saveTask(event:Event, title:string, description:string, status:string, subtaskInput:any){
    event.preventDefault()
    //Change title
    this.boardsService.currentTask.title = title;
    //Change description
    this.boardsService.currentTask.description = description
    //Change subtasks
    for ( let i = 0; i < subtaskInput.children.length; i++){
      this.boardsService.currentTask.subtasks[i].title = subtaskInput.children[i].firstChild.value
    }
    //Change status
    this.boardsService.currentTask.status = status
    this.boardsService.currentBoard.columns.find(column => column.name === status)?.tasks.unshift(this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks[this.indexes.taskIndex]);
    this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks.splice(this.indexes.taskIndex,1);
    this.boardsService.setBoards(this.boardsService.boards);
    this.modalShowService.closeModal();
  }
}
