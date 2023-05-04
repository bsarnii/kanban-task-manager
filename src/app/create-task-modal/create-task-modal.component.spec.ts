import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalFrameComponent } from '../shared/task-modal-frame/task-modal-frame.component';
import { CreateTaskModalComponent } from './create-task-modal.component';
import { BoardsService } from '../services/boards.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateTaskModalComponent', () => {
  let component: CreateTaskModalComponent;
  let fixture: ComponentFixture<CreateTaskModalComponent>;
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
      declarations: [ CreateTaskModalComponent, TaskModalFrameComponent ],
      providers: [{provide: BoardsService, useValue: mockBoardsService}],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
