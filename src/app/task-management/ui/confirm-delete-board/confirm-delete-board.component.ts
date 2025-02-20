import { Component, input, output } from '@angular/core';
import { ModalComponent } from "../../../shared/ui/modal/modal.component";
import { Board } from '../../types/boards.interface';

@Component({
    selector: 'app-confirm-delete-board',
    templateUrl: './confirm-delete-board.component.html',
    styleUrls: ['./confirm-delete-board.component.scss'],
    imports: [ModalComponent]
})
export class ConfirmDeleteBoardComponent {
  board = input.required<Board>();

  confirm = output();
  cancel = output();
}
