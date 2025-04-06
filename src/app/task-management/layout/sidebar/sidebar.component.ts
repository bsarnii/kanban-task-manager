import { Component, computed, inject } from '@angular/core';
import { ColorThemeService } from '../../../core/services/color-theme.service';
import { SidebarToggleService } from './sidebar-toggle.service';
import { BoardsStore } from '../../+store/boards.store';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersStore } from 'src/app/users/+store/users.store';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [RouterLink, RouterLinkActive]
})
export class SidebarComponent {
  colorThemeService = inject(ColorThemeService);
  sidebarService = inject(SidebarToggleService);
  boardsStore = inject(BoardsStore);
  usersStore = inject(UsersStore);
  authService = inject(AuthService);

  handleOnBoardClick(){
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false
    }
  }
  onCreateBoardClick(){
    if (window.innerWidth <= 575) {
      this.sidebarService.sidebarOpened = false
    }
  }

  createNewBoardPath = computed(() => {
    const boardId = this.boardsStore.activeBoardId();
    if(boardId){
      return ['/board', boardId, 'add-board'];
    } else {
      return ['/board-not-exists', 'add-board'];
    }
  })

}
