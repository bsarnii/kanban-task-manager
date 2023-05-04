import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalFrameComponent } from '../shared/task-modal-frame/task-modal-frame.component';
import { EditTaskModalComponent } from './edit-task-modal.component';
import { BoardsService } from '../services/boards.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditTaskModalComponent', () => {
  let component: EditTaskModalComponent;
  let fixture: ComponentFixture<EditTaskModalComponent>;
  const mockBoardsService = {
    boards:{
      boards: []
    },
    currentTask: {
      description: "",
      status: "",
      subtasks: [],
      title: ""
    },
    currentBoard: {
      columns: [],
      name: ""
    },
    getBoards(){}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaskModalComponent, TaskModalFrameComponent ],
      providers: [{provide: BoardsService, useValue: mockBoardsService}],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
