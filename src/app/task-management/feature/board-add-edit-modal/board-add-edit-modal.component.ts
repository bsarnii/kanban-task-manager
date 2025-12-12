import { Component, computed, ElementRef, inject, input, OnInit, viewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms"
import { BoardsStore } from 'src/app/task-management/+store/boards.store';
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BoardInputDto } from '../../types/boards.interface';
import { FieldWrapperComponent } from "src/app/shared/ui/form/field-wrapper/field-wrapper.component";


export enum BoardAddEditModalContextEnum {
  add = 'add',
  edit = 'edit'
}

@Component({
    selector: 'app-board-add-edit-modal',
    templateUrl: './board-add-edit-modal.component.html',
    styleUrls: ['./board-add-edit-modal.component.scss'],
    imports: [ReactiveFormsModule, ModalComponent, FieldWrapperComponent]
})
export class BoardAddEditModalComponent implements OnInit {
  boardsStore = inject(BoardsStore);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  addEditContext = input<BoardAddEditModalContextEnum>(BoardAddEditModalContextEnum.add);
  statusInputs = viewChildren<ElementRef<HTMLInputElement>>('statusInput');
  modalName = computed(() => this.addEditContext() === BoardAddEditModalContextEnum.add ? "Add New Board" : "Edit Board");
  boardName = computed(() => {
    if(this.addEditContext() === BoardAddEditModalContextEnum.add){
      return "";
    }
    return this.boardsStore.activeBoard()?.name || "";
  });
  initialStatuses = computed(() => {
    if(this.addEditContext() === BoardAddEditModalContextEnum.add){
      return [{name: "", id: Math.random().toString(36).substring(7)}];
    }
    return this.boardsStore.activeBoardStatuses();
  })

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
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
    setTimeout(() => {
      this.statusInputs()[this.statusInputs().length - 1].nativeElement.focus();
    }, 100);
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
      statuses: this.formStatuses.value.map(((status, i) => {
        return {
          name: status,
          id: this.initialStatuses()[i]?.id
         }
      })).filter(status => !!status.name),
    }
    this.boardsStore.editBoard(editedBoard);
    this.close();
  }

  createBoard(event:Event){
    event.preventDefault()
    if (this.form.status === "INVALID"){
      this.formName.markAsDirty();
      return
    }
    const newBoard:BoardInputDto = {
      statuses: this.formStatuses.value.filter(Boolean).map((status => {
        return {name: status }
      })),
      name: this.formName.value || "",
    }
    this.boardsStore.addBoard(newBoard);
  }
  
  ngOnInit(){
    if(!this.boardsStore.activeBoardExists() && this.addEditContext() === BoardAddEditModalContextEnum.edit){
      this.close();
    }
    this.formName.setValue(this.boardName());
    this.initialStatuses().map(status => {
      this.formStatuses.push(new FormControl(status.name))
    });

  }

  close(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  BoardAddEditModalContextEnum = BoardAddEditModalContextEnum;
}