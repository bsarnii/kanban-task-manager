import { Component, inject } from '@angular/core';
import { ColorThemeService } from '../../../core/services/color-theme.service';
import { SidebarToggleService } from './sidebar-toggle.service';
import { ModalShowService } from '../../../core/services/modal-show.service';
import { BoardsStore } from '../../+store/boards.store';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent {
  colorThemeService = inject(ColorThemeService);
  sidebarService = inject(SidebarToggleService);
  modalShowService = inject(ModalShowService);
  boardsStore = inject(BoardsStore);

  handleOnBoardClick(){
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false
    }
  }
  onCreateBoardClick(){
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false
    }
    this.modalShowService.openCreateBoardModal();
  }

}
