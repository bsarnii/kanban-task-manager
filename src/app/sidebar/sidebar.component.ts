import { Component, inject } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { BoardsService } from '../services/boards.service';
import { ModalShowService } from '../services/modal-show.service';
import { BoardsStore } from '../task-management/+store/boards.store';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [JsonPipe]
})
export class SidebarComponent {
  constructor (
    public colorTheme:ColorThemeService, 
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    ) {}

    boardsStore = inject(BoardsStore);
  
    handleOnBoardClick(boardId: string, index: number){
      if (window.innerWidth <= 575) {
        this.sidebarService.sidebarOpened = false
      }
      this.sidebarService.selectedIndex = index;
      this.boardsStore.setActiveBoardId(boardId);
    }
    onCreateBoardClick(){
      if (window.innerWidth <= 575) {
        this.sidebarService.sidebarOpened = false
      }
      this.modalShowService.openCreateBoardModal();
    }

}
