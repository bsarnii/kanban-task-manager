import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsService } from '../services/boards.service';
import { ConfirmDeleteBoardComponent } from './confirm-delete-board.component';

describe('ConfirmDeleteBoardComponent', () => {
  let component: ConfirmDeleteBoardComponent;
  let fixture: ComponentFixture<ConfirmDeleteBoardComponent>;
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
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteBoardComponent ],
      providers: [{ provide:BoardsService, useValue: mockBoardsService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
