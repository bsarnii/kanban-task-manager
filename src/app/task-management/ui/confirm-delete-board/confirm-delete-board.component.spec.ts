import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteBoardComponent } from './confirm-delete-board.component';

describe('ConfirmDeleteBoardComponent', () => {
  let component: ConfirmDeleteBoardComponent;
  let fixture: ComponentFixture<ConfirmDeleteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfirmDeleteBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteBoardComponent);
    fixture.componentRef.setInput('board', { id: '1', name: 'Test', statuses: [], createdAt: '', createdBy: '', boardMemberRole: 'OWNER' });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
