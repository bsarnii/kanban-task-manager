import { Component } from '@angular/core';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss']
})
export class CreateTaskModalComponent {
  constructor(public boardsService:BoardsService) {}

}
