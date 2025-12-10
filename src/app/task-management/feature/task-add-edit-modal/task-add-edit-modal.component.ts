import { Component, computed, ElementRef, inject, input, OnInit, viewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { TasksStore } from 'src/app/task-management/+store/tasks.store';
import { BoardsStore } from 'src/app/task-management/+store/boards.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { ActiveTaskNotFoundComponent } from "../../ui/active-task-not-found/active-task-not-found.component";

type SubtaskControl = {
  id: FormControl<string | null>;
  name: FormControl<string>;
  completed: FormControl<boolean>;
}

export enum TaskAddEditModalContextEnum {
  add = 'add',
  edit = 'edit'
}

@Component({
    selector: 'app-task-add-edit-modal',
    templateUrl: './task-add-edit-modal.component.html',
    styleUrls: ['./task-add-edit-modal.component.scss'],
    imports: [ReactiveFormsModule, ModalComponent, ActiveTaskNotFoundComponent]
})
export class TaskAddEditModalComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  fb = inject(NonNullableFormBuilder);
  tasksStore = inject(TasksStore);
  boardsStore = inject(BoardsStore);

  constructor(){
    if(!this.boardsStore.activeBoardExists()){
      this.close();
    }
  }

  addEditContext = input<TaskAddEditModalContextEnum>(TaskAddEditModalContextEnum.add);
  subtaskInputs = viewChildren<ElementRef<HTMLInputElement>>('subtaskInput');

  modalName = computed(() => this.addEditContext() === TaskAddEditModalContextEnum.add ? "Add New Task" : "Edit Task");
  taskName = computed(() => this.tasksStore.activeTask()?.name || "");
  initialSubtasks = computed(() => {
    const activeTask = this.tasksStore.activeTask();
    if(activeTask && activeTask.subtasks.length){
      return activeTask.subtasks;
    }
    return [{id: null, name: "", completed: false}]
  })


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
      id: new FormControl(),
      name: new FormControl('', { nonNullable: true }),
      completed: new FormControl(false, { nonNullable: true })
    }));
    setTimeout(() => {
      this.subtaskInputs()[this.subtaskInputs().length - 1].nativeElement.focus();
    }, 100);
  }
  
  saveTask(event:Event){
    event.preventDefault();
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.tasksStore.editTask({
      id: this.tasksStore.activeTaskId()!,
      taskInput: {
        name: this.formName.value,
        description: this.formDescription.value,
        statusId: this.formStatus.value,
        subtasks: this.formSubtasks.getRawValue().map((subtask) => ({
          id: subtask.id || undefined, 
          name: subtask.name, 
          completed: subtask.completed
        })).filter(subtask => subtask.name !== "")
      }
    })
    this.close();
  }

  createTask(event:Event){
    event.preventDefault()
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.tasksStore.addTask({
      boardId: this.boardsStore.activeBoardId() || "",
      name: this.formName.value,
      description: this.formDescription.value,
      statusId: this.formStatus.value,
      subtasks: this.formSubtasks.getRawValue().map((subtask) => ({
        name: subtask.name, 
        completed: false
      })).filter(subtask => subtask.name !== "")
    })
    this.close();
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
    this.formName.setValue(this.taskName());
    this.formDescription.setValue(this.tasksStore.activeTask()?.description || "");
    this.formStatus.setValue(this.tasksStore.activeTask()?.statusId || this.boardsStore.activeBoardStatuses()[0].id);
    this.initialSubtasks().map(subtask => {
      this.formSubtasks.push(this.fb.group({
        id: subtask.id ,
        name: subtask.name,
        completed: subtask.completed
      }))
    });
  }

  TaskAddEditModalContextEnum = TaskAddEditModalContextEnum;

  close(){
    this.router.navigate(
      [this.addEditContext() === TaskAddEditModalContextEnum.add ? '..' : '../../..'], { relativeTo: this.route }
    );
  }
}
