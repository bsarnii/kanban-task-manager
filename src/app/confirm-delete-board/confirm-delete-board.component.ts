import { Component, inject } from '@angular/core';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsService } from '../services/boards.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { BoardsStore } from '../task-management/+store/boards.store';

@Component({
    selector: 'app-confirm-delete-board',
    templateUrl: './confirm-delete-board.component.html',
    styleUrls: ['./confirm-delete-board.component.scss']
})
export class ConfirmDeleteBoardComponent {
  constructor(
    public modalShowService:ModalShowService,
    public boardsService:BoardsService,
    public sidebarService: SidebarToggleService
    ) {}
    boardsStore = inject(BoardsStore);

  indexes = this.boardsService.indexes;

  deleteBoard(){
    this.boardsStore.deleteBoard(this.boardsStore.activeBoard()!.id);
    if(this.boardsStore.boards().length){
      this.boardsStore.setActiveBoardId(this.boardsStore.boards()[0].id);
    } else {
      this.boardsStore.setActiveBoardId(null);
    }
    this.modalShowService.closeModal();
  }
  cancelDelete(){
    this.modalShowService.closeModal()
  }
}
