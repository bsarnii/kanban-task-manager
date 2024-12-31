import { Component, ElementRef, inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalShowService } from 'src/app/services/modal-show.service';
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms"
import { Column } from 'src/app/types/boards.interface';
import { SidebarToggleService } from 'src/app/services/sidebar-toggle.service';
import { BoardsStore } from 'src/app/task-management/+store/boards.store';


@Component({
    selector: 'app-board-modal-frame',
    templateUrl: './board-modal-frame.component.html',
    styleUrls: ['./board-modal-frame.component.scss'],
    imports: [ReactiveFormsModule]
})
export class BoardModalFrameComponent implements OnInit {

  constructor(
    public boardsService:BoardsService,
    public modalShowService:ModalShowService,
    public sidebarService:SidebarToggleService
    ){}
  
  boardsStore = inject(BoardsStore)

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

  @ViewChildren('templateColumn') columnChildren!: QueryList<ElementRef<HTMLInputElement>>;

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
  
  saveBoard(event:Event){
    event.preventDefault()
    const columnArray = this.columnChildren.toArray();
    if (this.name.status === "INVALID"){
      this.name.markAsDirty();
      return
    }
    //Change title
    const editedBoard = {
      ...this.boardsStore.activeBoard()!,
      name: this.name.value || "",
      columns: columnArray.flatMap((column:ElementRef<HTMLInputElement>) => {
        if (!column.nativeElement.value){
          return []
        }else {
          return {
            name: column.nativeElement.value,
            tasks: []
          }
        }
      })
    }
    this.boardsStore.editBoard(editedBoard);
    this.modalShowService.closeModal();
  }

  createBoard(event:Event){
    event.preventDefault()
    const columnArray = this.columnChildren.toArray();
    if (this.name.status === "INVALID"){
      this.name.markAsDirty();
      return
    }
    const newBoard = {
      columns: columnArray.flatMap((column:ElementRef<HTMLInputElement>) => {
        if (!column.nativeElement.value){
          return []
        }else {
          return {
            name: column.nativeElement.value,
            tasks: []
          }
        }
      }),
      name: this.name.value || "",
      id: Math.random().toString(36).substring(7)
    }
    this.sidebarService.selectedIndex = 0;
    this.boardsStore.addBoard(newBoard);
    this.boardsStore.setActiveBoardId(newBoard.id);
    this.modalShowService.closeModal();
  }
  
  ngOnInit(){
    this.name.setValue(this.titleValue)
    this.columnsCopy = this.columns.map((column: Column) => column)
  }
}