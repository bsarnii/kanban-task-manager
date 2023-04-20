import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteBoardComponent } from './confirm-delete-board.component';

describe('ConfirmDeleteBoardComponent', () => {
  let component: ConfirmDeleteBoardComponent;
  let fixture: ComponentFixture<ConfirmDeleteBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteBoardComponent ]
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
