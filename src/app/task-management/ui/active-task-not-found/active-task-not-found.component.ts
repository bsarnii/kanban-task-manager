import { Component, output } from '@angular/core';
import { ModalComponent } from "../../../shared/ui/modal/modal.component";

@Component({
  selector: 'app-active-task-not-found',
  imports: [ModalComponent],
  template: `
    <app-modal (backdropClick)="close.emit()">
    <div class="content" modalBody>
      <i class="pi pi-exclamation-triangle" style="font-size: 2rem;"></i>
      <h1 class="heading-xl">Task not found!</h1>
      <p class="body-l">Please select an existing task or create a new one.</p>
    </div>
    <button class="btn button-secondary" modalFooter (click)="close.emit()">Close</button>
  </app-modal>

  `,
  styles: `
    .content{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: .5rem;
    }
    @media screen and (max-width: 575px) {
    button{
        width: 100%;
    }
}
  `
})
export class ActiveTaskNotFoundComponent {
  close = output();
}
