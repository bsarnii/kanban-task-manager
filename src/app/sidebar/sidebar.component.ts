import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor (
    public colorTheme:ColorThemeService, 
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    ) {}
  
    handleOnBoardClick(index:number){
      if (window.innerWidth <= 575) {
        this.sidebarService.sidebarOpened = false
      }
      this.sidebarService.selectedIndex = index;
      this.boardsService.setCurrentBoard(this.boardsService.boards.boards[index])
      this.boardsService.indexes.boardIndex = index;
 
    }
    onCreateBoardClick(){
      if (window.innerWidth <= 575) {
        this.sidebarService.sidebarOpened = false
      }
    }

}
