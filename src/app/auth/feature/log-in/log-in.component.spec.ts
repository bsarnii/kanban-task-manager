import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import LogInComponent from './log-in.component';


describe('LogInComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInComponent],
      providers: [provideRouter([]), MessageService]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LogInComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
  
});