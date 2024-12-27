import { Component } from '@angular/core';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsService } from '../services/boards.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';

@Component({
    selector: 'app-confirm-delete-task',
    templateUrl: './confirm-delete-task.component.html',
    styleUrls: ['./confirm-delete-task.component.scss']
})
export class ConfirmDeleteTaskComponent {
  constructor(
    public modalShowService:ModalShowService,
    public boardsService:BoardsService,
    public sidebarService: SidebarToggleService
    ) {}

  indexes = this.boardsService.indexes;

  deleteTask(){
    this.boardsService.currentBoard.columns[this.indexes.columnIndex].tasks.splice(this.indexes.taskIndex,1);
    this.boardsService.setBoards(this.boardsService.boards);
    this.modalShowService.closeModal();
  }
  cancelDelete(){
    this.modalShowService.closeModal()
  }
}
