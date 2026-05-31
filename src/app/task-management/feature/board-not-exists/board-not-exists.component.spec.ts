import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BoardNotExistsComponent } from './board-not-exists.component';

describe('BoardNotExistsComponent', () => {
    let component: BoardNotExistsComponent;
    let fixture: ComponentFixture<BoardNotExistsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BoardNotExistsComponent],
            providers: [provideRouter([])]
        })
            .compileComponents();

        fixture = TestBed.createComponent(BoardNotExistsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
