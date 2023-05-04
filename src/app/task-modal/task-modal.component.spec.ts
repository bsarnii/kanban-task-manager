import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalComponent } from './task-modal.component';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsService } from '../services/boards.service';


describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let boardsServiceSpy: jasmine.SpyObj<BoardsService>;
  let modalShowServiceSpy: jasmine.SpyObj<ModalShowService>;
  const mockBoardsService = {
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
    const boardsServiceSpyObj = jasmine.createSpyObj('BoardsService', ['getBoards', 'setBoards']);
    const modalShowServiceSpyObj = jasmine.createSpyObj('ModalShowService', ['closeModal', 'openDeleteTaskModal']);

    await TestBed.configureTestingModule({
      declarations: [ TaskModalComponent ],
      providers: 
      [
        { provide: ModalShowService, useValue: modalShowServiceSpyObj},
        { provide: BoardsService, useValue: mockBoardsService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    boardsServiceSpy = TestBed.inject(BoardsService) as jasmine.SpyObj<BoardsService>;
    modalShowServiceSpy = TestBed.inject(ModalShowService) as jasmine.SpyObj<ModalShowService>;
    boardsServiceSpy.getBoards();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
