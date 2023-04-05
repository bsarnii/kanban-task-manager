import { Component, OnInit } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { CurrentBoardService } from '../services/current-board.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor (
    public colorTheme:ColorThemeService, 
    public sidebarService: SidebarToggleService,
    public currentBoardService: CurrentBoardService,
    ) {}

    selectedIndex:number = 0;
    boards:any;
  
    handleOnBoardClick(index:number){
      if (window.innerWidth <= 575) {
        this.sidebarService.sidebarOpened = false
      }
      this.selectedIndex = index;
      this.currentBoardService.setCurrentBoard(this.boards.boards[index])
 
    }
    onCreateBoardClick(){
      if (window.innerWidth <= 575) {
        this.sidebarService.sidebarOpened = false
      }
    }


    ngOnInit(): void {
        this.boards = JSON.parse(localStorage['boards'])
    }
}
