import { Component, Input, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalShowService } from 'src/app/services/modal-show.service';
import { FormControl, Validators } from "@angular/forms"

@Component({
  selector: 'app-board-modal-frame',
  templateUrl: './board-modal-frame.component.html',
  styleUrls: ['./board-modal-frame.component.scss']
})
export class BoardModalFrameComponent implements OnInit {

  constructor(public boardsService:BoardsService, public modalShowService:ModalShowService){}

  @Input() modalName:string = "";
  @Input() titleValue:string = "";
  @Input() descriptionValue:string = "";
  @Input() columns:any = [
    {
    name: "",
    tasks: []
    },
    {
    name: "",
    tasks: []
    }
  ];
  @Input() statusValues:any = [];
  @Input() buttonName:string = "";

  name = new FormControl('', Validators.required);
  indexes = this.boardsService.indexes;

  removeColumn(columnIndex:number,event:Event){
    event.preventDefault()
    this.columns.splice(columnIndex,1)
  }
  addNewColumn(event:Event){
    event.preventDefault()
    this.columns.push({
      name:"",
      tasks:[]
    })
  }
  
  saveBoard(event:Event){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      return
    }
    //Change title
    this.boardsService.currentBoard.name = this.name.value || "";
    this.modalShowService.closeModal();
  }

  createBoard(event:Event){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      return
    }
    this.boardsService.boards.boards.unshift({
      columns: [],
      name: this.name.value || ""
    })
    this.modalShowService.closeModal();
  }
  
  ngOnInit(){
    this.name.setValue(this.titleValue)
  }
}