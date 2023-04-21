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
  columnsCopy:any;

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
  
  saveBoard(event:Event,columnsContainer:any){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      return
    }
    //Change title
    this.boardsService.currentBoard.name = this.name.value || "";

    for ( let i = 0; i < columnsContainer.children.length; i++){
      if (!columnsContainer.children[i].firstChild.firstChild.value){
        continue
      }
      if (!this.boardsService.currentBoard.columns[i]){
        this.boardsService.currentBoard.columns.push({
          name: columnsContainer.children[i].firstChild.firstChild.value,
          tasks: []
        })
      }
      this.boardsService.currentBoard.columns[i].name = columnsContainer.children[i].firstChild.firstChild.value
    }
    this.modalShowService.closeModal();
  }

  createBoard(event:Event,columnsContainer:any){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      return
    }
    this.boardsService.boards.boards.unshift({
      columns: [],
      name: this.name.value || ""
    })
    this.boardsService.currentBoard = this.boardsService.boards.boards[0];
    for ( let i = 0; i < columnsContainer.children.length; i++){
      if (!columnsContainer.children[i].firstChild.firstChild.value){
        continue
      }
      this.boardsService.currentBoard.columns.push({
        name: columnsContainer.children[i].firstChild.firstChild.value,
        tasks: []
      })
    }
    this.boardsService.setBoards(this.boardsService.boards)
    this.modalShowService.closeModal();
  }
  
  ngOnInit(){
    this.name.setValue(this.titleValue)
    this.columnsCopy = this.columns.map((column: any) => column)
  }
}