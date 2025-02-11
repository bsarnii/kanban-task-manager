import { Component, HostListener, inject, signal } from '@angular/core';
import { ColorThemeService } from '../../../core/services/color-theme.service';
import { SidebarToggleService } from '../sidebar/sidebar-toggle.service';
import { ModalShowService } from '../../../core/services/modal-show.service';
import { CommonModule } from '@angular/common';
import { BoardsStore } from '../../+store/boards.store';
import { ConfirmDeleteBoardComponent } from "../../ui/confirm-delete-board/confirm-delete-board.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, ConfirmDeleteBoardComponent]
})
export class HeaderComponent {
    boardsStore = inject(BoardsStore);
    colorThemeService = inject(ColorThemeService);
    sidebarService = inject(SidebarToggleService);
    modalShowService = inject(ModalShowService);

    boardBeingDeleted = signal(false);
    showEditDeleteOverlay = false;

    @HostListener('document:click')
    clickOutside() {
        this.showEditDeleteOverlay = false;
    }

    toggleEditDeleteOverlay(event: MouseEvent){
      event.stopPropagation();
      this.showEditDeleteOverlay = !this.showEditDeleteOverlay;
    }

    deleteBoard(){
      this.boardsStore.deleteBoard(this.boardsStore.activeBoard()!.id);
      if(this.boardsStore.boards().length){
        this.boardsStore.setActiveBoardId(this.boardsStore.boards()[0].id);
      } else {
        this.boardsStore.setActiveBoardId(null);
      }
      this.boardBeingDeleted.set(false);
    }

    onEditBoardBtnClick(event: MouseEvent){
      event.stopPropagation();
      this.modalShowService.openEditBoardModal();
      this.toggleEditDeleteOverlay(event);
    }
    onDeleteBoardBtnClick(event: MouseEvent){
      event.stopPropagation();
      this.boardBeingDeleted.set(true);
      this.toggleEditDeleteOverlay(event)
    }

    handleAddNewTask(){
      this.modalShowService.openCreateTaskModal();
    }

}
