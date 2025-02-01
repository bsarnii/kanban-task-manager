import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalShowService } from 'src/app/services/modal-show.service';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms"
import { SidebarToggleService } from 'src/app/services/sidebar-toggle.service';
import { BoardsStore } from 'src/app/task-management/+store/boards.store';
import { Status } from 'src/app/types/status.interface';


@Component({
    selector: 'app-board-modal-frame',
    templateUrl: './board-modal-frame.component.html',
    styleUrls: ['./board-modal-frame.component.scss'],
    imports: [ReactiveFormsModule]
})
export class BoardModalFrameComponent implements OnInit {
  modalShowService = inject(ModalShowService);
  sidebarService = inject(SidebarToggleService);
  boardsStore = inject(BoardsStore);
  fb = inject(FormBuilder);

  @Input() modalName:string = "";
  @Input() boardName:string = "";
  @Input() initialStatuses:Status[] = [{name: "", id: Math.random().toString(36).substring(7)}];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(21)]],
    statuses: new FormArray([] as FormControl[])
  })
  columnPlaceholders = ["e.g Todo", "e.g Doing", "e.g Done", "e.g Now", "e.g Next", "e.g Later"];

  get formStatuses(){
    return this.form.get('statuses') as FormArray<FormControl>;
  }

  get formName(){
    return this.form.get('name') as FormControl;
  }

  removeColumn(index:number,event:Event){
    event.preventDefault();
    this.formStatuses.removeAt(index);
  }
  addNewColumn(event:Event){
    event.preventDefault();
    this.formStatuses.push(new FormControl(""));
  }
  
  saveBoard(event:Event){
    event.preventDefault()
    if (this.form.status === "INVALID"){
      this.formName.markAsDirty();
      return
    }
    //Change title
    const editedBoard = {
      ...this.boardsStore.activeBoard()!,
      name: this.formName.value || "",
      columns: [],
      statuses: this.formStatuses.value.map(((status, i) => {
        return {
          name: status,
          id: this.initialStatuses[i]?.id || Math.random().toString(36).substring(7)
         }
      })).filter(status => !!status.name),
    }
    this.boardsStore.editBoard(editedBoard);
    this.modalShowService.closeModal();
  }

  createBoard(event:Event){
    event.preventDefault()
    if (this.form.status === "INVALID"){
      this.formName.markAsDirty();
      return
    }
    const newBoard = {
      //TODO: Remove the columns prop from the board interface
      columns: [],
      tasks: [],
      statuses: this.formStatuses.value.filter(Boolean).map((status => {
        return {name: status, id: Math.random().toString(36).substring(7) }
      })),
      name: this.formName.value || "",
      id: Math.random().toString(36).substring(7),
    }
    this.sidebarService.selectedIndex = 0;
    this.boardsStore.addBoard(newBoard);
    this.boardsStore.setActiveBoardId(newBoard.id);
    this.modalShowService.closeModal();
  }
  
  ngOnInit(){
    this.formName.setValue(this.boardName);
    this.initialStatuses.map(status => {
      this.formStatuses.push(new FormControl(status.name))
    });
  }
}