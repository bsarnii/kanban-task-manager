import { Component, Input, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalShowService } from 'src/app/services/modal-show.service';
import { FormControl, Validators } from "@angular/forms"
import { Column } from 'src/app/types/boards.interface';

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
  @Input() columns:Array<Column> = [
    {
    name: "",
    tasks: []
    },
    {
    name: "",
    tasks: []
    }
  ];
  @Input() statusValues:string[] = [];
  @Input() buttonName:string = "";

  name = new FormControl('', [Validators.required, Validators.maxLength(21)]);
  indexes = this.boardsService.indexes;
  columnsCopy!: Array<Column>;
  columnPlaceholders = ["e.g Todo", "e.g Doing", "e.g Done", "e.g Now", "e.g Next", "e.g Later"]

  removeColumn(columnIndex:number,event:Event){
    event.preventDefault()
    this.columnsCopy.splice(columnIndex,1)
  }
  addNewColumn(event:Event){
    event.preventDefault()
    this.columnsCopy.push({
      name:"",
      tasks:[]
    })
  }
  
  saveBoard(event:Event,columnsContainer:any){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      this.name.markAsDirty();
      return
    }
    //Change title
    this.boardsService.currentBoard.name = this.name.value || "";
    this.boardsService.currentBoard.columns = this.columnsCopy;
    for ( let i = 0; i < columnsContainer.children.length; i++){
      if (!this.boardsService.currentBoard.columns[i] && columnsContainer.children[i].firstChild.firstChild.value ){
        this.boardsService.currentBoard.columns.push({
          name: columnsContainer.children[i].firstChild.firstChild.value,
          tasks: []
        })
      }
      this.boardsService.currentBoard.columns[i].name = columnsContainer.children[i].firstChild.firstChild.value
    }
    this.boardsService.currentBoard.columns = this.boardsService.currentBoard.columns.filter(column => !!column.name)
    this.boardsService.setBoards(this.boardsService.boards);
    this.modalShowService.closeModal();
  }

  createBoard(event:Event,columnsContainer:any){
    event.preventDefault()
    if (this.name.status === "INVALID"){
      this.name.markAsDirty();
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
    this.columnsCopy = this.columns.map((column: Column) => column)
  }
}