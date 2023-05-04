import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsService } from '../services/boards.service';
import { ModalShowService } from '../services/modal-show.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let modalShowServiceSpy: jasmine.SpyObj<ModalShowService>;
  const mockBoardsService = {
    boards:{
      boards: []
    },
    currentTask: {
      description: "",
      status: "Todo",
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
    const modalShowServiceSpyObj = jasmine.createSpyObj('ModalShowService',
     ['openEditBoardModal', 'closeEditDeleteContainer', 'openDeleteBoardModal', 'openCreateTaskModal'],
     ['showCreateTaskModal']
     );

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: BoardsService, useValue: mockBoardsService},
        {provide: ModalShowService, useValue: modalShowServiceSpyObj}
      
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    modalShowServiceSpy = TestBed.inject(ModalShowService) as jasmine.SpyObj<ModalShowService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the status to empty string and openCreateTaskModal should be called', () => {
    component.handleAddNewTask();
    expect(mockBoardsService.currentTask.status).toBe("");
    expect(modalShowServiceSpy.openCreateTaskModal).toHaveBeenCalled();
  });

});
