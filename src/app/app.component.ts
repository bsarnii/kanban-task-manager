import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import data from '../assets/data.json';
import { BoardsService } from './services/boards.service';
import { ModalShowService } from './services/modal-show.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService
    ) {
      if (localStorage.length === 0){
        boardsService.setBoards(data)
      }
      boardsService.getBoards();
      boardsService.setCurrentBoard(boardsService.boards.boards[0])
    }

  ngOnInit(){
    if (window.innerWidth <= 575){
      this.sidebarService.sidebarOpened = false;
    }
  }
}
