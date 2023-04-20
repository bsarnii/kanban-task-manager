import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModalFrameComponent } from './board-modal-frame.component';

describe('BoardModalFrameComponent', () => {
  let component: BoardModalFrameComponent;
  let fixture: ComponentFixture<BoardModalFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardModalFrameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardModalFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
