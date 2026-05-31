import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteBoardComponent } from './confirm-delete-board.component';
import { BoardsStore } from 'app/task-management/+store/boards.store';

describe('ConfirmDeleteBoardComponent', () => {
  let component: ConfirmDeleteBoardComponent;
  let fixture: ComponentFixture<ConfirmDeleteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteBoardComponent ],
      providers: [BoardsStore]
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
