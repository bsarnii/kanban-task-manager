import { Component, input, output } from '@angular/core';
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { Task } from '../../types/task.interface';

@Component({
    selector: 'app-confirm-delete-task',
    templateUrl: './confirm-delete-task.component.html',
    styleUrls: ['./confirm-delete-task.component.scss'],
    imports: [ModalComponent]
})
export class ConfirmDeleteTaskComponent {
  task = input.required<Task>();

  confirm = output();
  cancel = output();

}
