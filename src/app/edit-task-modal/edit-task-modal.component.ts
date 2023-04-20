import { Component } from '@angular/core';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss']
})
export class EditTaskModalComponent {

  constructor(public boardsService:BoardsService) {}

  subtaskCopy = this.boardsService.currentTask.subtasks.map(subtask => subtask)
}
