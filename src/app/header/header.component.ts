import { Component } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { BoardsService } from '../services/boards.service';
import { ModalShowService } from '../services/modal-show.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public colorTheme: ColorThemeService, 
    public sidebarService:SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService 
    ) {}

    showEditDeleteContainer = false;


    openEditDeleteContainer(){
      this.showEditDeleteContainer = !this.showEditDeleteContainer;
    }

    openEditBoardModal(){
      this.modalShowService.openEditBoardModal();
      this.showEditDeleteContainer = !this.showEditDeleteContainer;
    }
    openDeleteBoardModal(){
      this.showEditDeleteContainer = !this.showEditDeleteContainer;
      this.modalShowService.openDeleteBoardModal();
    }

}
