import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import data from '../assets/data.json';
import { CurrentBoardService } from './services/current-board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (
    public sidebarService: SidebarToggleService,
    public currentBoardService: CurrentBoardService
    ) {
      if (localStorage.length === 0){
        localStorage.setItem("boards", JSON.stringify(data))
      }
      currentBoardService.setCurrentBoard(JSON.parse(localStorage["boards"]).boards[0])
    }

  ngOnInit(){
    if (window.innerWidth <= 575){
      this.sidebarService.sidebarOpened = false;
    }
  }
}
