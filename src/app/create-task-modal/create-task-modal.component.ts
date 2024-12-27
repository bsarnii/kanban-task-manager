import { Component } from '@angular/core';
import { BoardsService } from '../services/boards.service';
import { TaskModalFrameComponent } from "../shared/task-modal-frame/task-modal-frame.component";

@Component({
    selector: 'app-create-task-modal',
    templateUrl: './create-task-modal.component.html',
    styleUrls: ['./create-task-modal.component.scss'],
    imports: [TaskModalFrameComponent]
})
export class CreateTaskModalComponent {
  constructor(public boardsService:BoardsService) {}

}
