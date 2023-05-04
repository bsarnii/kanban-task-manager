import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsService } from '../services/boards.service';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
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
      declarations: [ SidebarComponent ],
      providers: [{ provide: BoardsService, useValue: mockBoardsService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
