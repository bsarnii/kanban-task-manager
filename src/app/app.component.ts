import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import data from '../assets/data.json';
import { BoardsService } from './services/boards.service';
import { ModalShowService } from './services/modal-show.service';
import { ColorThemeService } from './services/color-theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {

  constructor (
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    public colorThemeService:ColorThemeService
    ) {
      if (localStorage.getItem("boards") === null){
        boardsService.setBoards(data)
      }
      boardsService.getBoards();
      boardsService.setCurrentBoard(boardsService.boards.boards[0])
      if (localStorage.getItem("lightMode") === null){
        colorThemeService.setTheme("false");
      }
      colorThemeService.getTheme();
    }
    
  ngOnInit(){
    if (window.innerWidth <= 575){
      this.sidebarService.sidebarOpened = false;
    }
  }
}
