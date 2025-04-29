import { Component } from '@angular/core';

@Component({
  selector: 'app-active-board-not-found',
  imports: [],
  template: `
    <i class="pi pi-exclamation-triangle" style="font-size: 2rem;"></i>
    <h1 class="heading-xl">Board not found!</h1>
    <p class="body-l">Please select an existing board or create a new one.</p>
  `,
  styles: `
    :host{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: .5rem;
    }
  `
})
export class ActiveBoardNotFoundComponent {}
