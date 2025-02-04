import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalShowService } from 'src/app/core/services/modal-show.service';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { Subtask } from 'src/app/task-management/types/task.interface';
import { Status } from 'src/app/task-management/types/status.interface';
import { TasksStore } from 'src/app/task-management/+store/tasks.store';
import { BoardsStore } from 'src/app/task-management/+store/boards.store';

type SubtaskControl = {
  id: FormControl<string>;
  name: FormControl<string>;
  isCompleted: FormControl<boolean>;
}

//TODO: Make component dumb!
@Component({
    selector: 'app-task-add-edit-modal',
    templateUrl: './task-add-edit-modal.component.html',
    styleUrls: ['./task-add-edit-modal.component.scss'],
    imports: [ReactiveFormsModule]
})
export class TaskAddEditModalComponent implements OnInit {
  modalShowService = inject(ModalShowService);

  @Input() modalName:string = "";
  @Input() taskName:string = "";
  @Input() description:string = "";
  @Input() subtasks:Subtask[] = [
    {id: 'test', name: "", isCompleted: false},
  ];
  @Input() statuses:Status[] = [];
  @Input() initialStatusId = "";
  @Input() buttonName:string = "";
  @Input() taskId:string | null = null;
  @Input() position = 0;
  @Input() latestPosition = 0;

  fb = inject(NonNullableFormBuilder);
  tasksStore = inject(TasksStore);
  boardsStore = inject(BoardsStore);
  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    subtasks: this.fb.array([] as FormGroup<SubtaskControl>[]),
    status: ['', Validators.required]
  })

  subtaskPlaceholders = ["e.g. Make coffee", "e.g Drink coffee & smile", "e.g. Enjoy your caffeine boost", "e.g. Wash the cup"]


  removeSubtask(index:number,event:Event){
    event.preventDefault();
    this.formSubtasks.removeAt(index);
  }
  addNewSubtask(event:Event){
    event.preventDefault();
    this.formSubtasks.push(this.fb.group({
      id: new FormControl(Math.random().toString(36).substring(7), { nonNullable: true }),
      name: new FormControl('', { nonNullable: true }),
      isCompleted: new FormControl(false, { nonNullable: true })
    }));
  }
  
  saveTask(event:Event){
    event.preventDefault();
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.tasksStore.editTask({
      id: this.taskId || Math.random().toString(36).substring(7),
      boardId: this.boardsStore.activeBoardId() || "",
      name: this.formName.value,
      description: this.formDescription.value,
      statusId: this.formStatus.value,
      subtasks: this.formSubtasks.getRawValue().map((subtask) => ({
        id: subtask.id, 
        name: subtask.name, 
        isCompleted: subtask.isCompleted
      })).filter(subtask => subtask.name !== "")
    })
    this.modalShowService.closeModal();
  }

  createTask(event:Event){
    event.preventDefault()
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.tasksStore.addTask({
      id: Math.random().toString(36).substring(7),
      boardId: this.boardsStore.activeBoardId() || "",
      name: this.formName.value,
      description: this.formDescription.value,
      statusId: this.formStatus.value,
      subtasks: this.formSubtasks.getRawValue().map((subtask) => ({
        id: Math.random().toString(36).substring(7), 
        name: subtask.name, 
        isCompleted: false
      })).filter(subtask => subtask.name !== "")
    })
    this.modalShowService.closeModal();
  }

  get formName() {
    return this.form.get('name') as FormControl<string>;
  }
  get formDescription() {
    return this.form.get('description') as FormControl<string>;
  }
  get formSubtasks(){
    return this.form.get('subtasks') as FormArray<FormGroup<SubtaskControl>>;
  }
  get formStatus(){
    return this.form.get('status') as FormControl<string>;
  }

  ngOnInit(){
    this.formName.setValue(this.taskName);
    this.formDescription.setValue(this.description);
    this.formStatus.setValue(this.initialStatusId || this.statuses[0].id);
    this.subtasks.map(subtask => {
      this.formSubtasks.push(this.fb.group({
        id: subtask.id,
        name: subtask.name,
        isCompleted: subtask.isCompleted
      }))
    });
  }
}
