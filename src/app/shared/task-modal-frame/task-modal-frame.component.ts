import { Component, Input, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalShowService } from 'src/app/services/modal-show.service';
import { FormControl, Validators } from "@angular/forms"
import { Column, Subtask } from 'src/app/types/boards.interface';

@Component({
  selector: 'app-task-modal-frame',
  templateUrl: './task-modal-frame.component.html',
  styleUrls: ['./task-modal-frame.component.scss']
})
export class TaskModalFrameComponent implements OnInit {

  constructor(public boardsService:BoardsService, public modalShowService:ModalShowService){}

  @Input() modalName:string = "";
  @Input() titleValue:string = "";
  @Input() descriptionValue:string = "";
  @Input() subtasks:Array<Subtask> = [];
  @Input() statusValues:Array<Column> = [];
  @Input() buttonName:string = "";

  name = new FormControl('', Validators.required);
  indexes = this.boardsService.indexes;
  subtaskPlaceholders = ["e.g. Make coffee", "e.g Drink coffee & smile", "e.g. Enjoy your caffeine boost", "e.g. Wash the cup"]

  removeSubtask(subtaskIndex:number,event:Event){
    event.preventDefault()
    this.subtasks.splice(subtaskIndex,1)
  }
  addNewSubtask(event:Event){
    event.preventDefault()
    this.subtasks.push({title:"",isCompleted:false})
  }
  
  saveTask(event:Event, title:string, description:string, status:string, subtasksInput:any){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      this.name.markAsDirty();
      return
    }
    //Change title
    this.boardsService.currentTask.title = title;
    //Change description
    this.boardsService.currentTask.description = description
    //Change subtasks
    this.boardsService.currentTask.subtasks = this.subtasks
    for ( let i = 0; i < subtasksInput.children.length; i++){
      if (!this.boardsService.currentTask.subtasks[i] && subtasksInput.children[i].firstChild.firstChild.value) {
        this.boardsService.currentTask.subtasks.push({
          title: subtasksInput.children[i].firstChild.firstChild.value,
          isCompleted: false,
        })
      } else{
      this.boardsService.currentTask.subtasks[i].title = subtasksInput.children[i].firstChild.firstChild.value;
      }
    }
    this.boardsService.currentTask.subtasks = this.boardsService.currentTask.subtasks.filter(subtask => !!subtask.title);
    //Change status
    if (status !== this.boardsService.currentTask.status){
      this.boardsService.currentTask.status = status
      this.boardsService.currentBoard.columns.find(column => column.name === status)?.tasks.unshift(this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks[this.indexes.taskIndex]);
      this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks.splice(this.indexes.taskIndex,1);
    }

    this.boardsService.setBoards(this.boardsService.boards);
    this.modalShowService.closeModal();
  }

  createTask(event:Event, title:string, description:string, status:string, subtasksInput:any){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      this.name.markAsDirty();
      return
    }
    //Adding value to subtasks variable
    for ( let i = 0; i < subtasksInput.children.length; i++){
      this.subtasks[i].title = subtasksInput.children[i].firstChild.firstChild.value
      if (!this.subtasks[i].title) {
        this.subtasks.splice(i,1)
      }
    }
    //Find column after status value then create new task
        this.boardsService.currentTask.status = status
        this.boardsService.currentBoard.columns.find(column => column.name === status)?.tasks.unshift({
          title: title,
          description: description,
          status: status,
          subtasks: this.subtasks
        })
    this.modalShowService.closeModal();
  }
  
  ngOnInit(){
    this.name.setValue(this.titleValue)
  }
}
