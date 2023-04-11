import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalFrameComponent } from './task-modal-frame.component';

describe('TaskModalFrameComponent', () => {
  let component: TaskModalFrameComponent;
  let fixture: ComponentFixture<TaskModalFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskModalFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModalFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
