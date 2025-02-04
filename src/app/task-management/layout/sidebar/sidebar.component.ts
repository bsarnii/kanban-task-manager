import { Component, inject } from '@angular/core';
import { ColorThemeService } from '../../../core/services/color-theme.service';
import { SidebarToggleService } from './sidebar-toggle.service';
import { ModalShowService } from '../../../core/services/modal-show.service';
import { BoardsStore } from '../../+store/boards.store';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: []
})
export class SidebarComponent {
  colorThemeService = inject(ColorThemeService);
  sidebarService = inject(SidebarToggleService);
  modalShowService = inject(ModalShowService);
  boardsStore = inject(BoardsStore);

  handleOnBoardClick(boardId: string){
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false
    }
    this.boardsStore.setActiveBoardId(boardId);
  }
  onCreateBoardClick(){
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false
    }
    this.modalShowService.openCreateBoardModal();
  }

}
