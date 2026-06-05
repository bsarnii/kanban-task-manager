import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteTaskComponent } from './confirm-delete-task.component';

describe('ConfirmDeleteTaskComponent', () => {
  let component: ConfirmDeleteTaskComponent;
  let fixture: ComponentFixture<ConfirmDeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteTaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteTaskComponent);
    fixture.componentRef.setInput('task', {
      id: '1',
      boardId: '1',
      name: 'Test',
      description: '',
      statusId: '1',
      subtasks: [],
      createdAt: '',
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
