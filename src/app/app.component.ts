import { Component, OnInit } from '@angular/core';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import data from '../assets/data.json';
import { BoardsService } from './services/boards.service';
import { ModalShowService } from './services/modal-show.service';
import { ColorThemeService } from './services/color-theme.service';

import { BoardModalFrameComponent } from './shared/board-modal-frame/board-modal-frame.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { EditTaskModalComponent } from "./edit-task-modal/edit-task-modal.component";
import { CreateTaskModalComponent } from "./create-task-modal/create-task-modal.component";
import { ConfirmDeleteBoardComponent } from "./confirm-delete-board/confirm-delete-board.component";
import { ConfirmDeleteTaskComponent } from "./confirm-delete-task/confirm-delete-task.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [BoardModalFrameComponent, SidebarComponent, HeaderComponent, MainComponent, TaskModalComponent, EditTaskModalComponent, CreateTaskModalComponent, ConfirmDeleteBoardComponent, ConfirmDeleteTaskComponent],
    standalone: true
})
export class AppComponent implements OnInit {

  constructor (
    public sidebarService: SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService,
    public colorThemeService:ColorThemeService
    ) {
      /*if (localStorage.getItem("boards") === null){
        boardsService.setBoards(data)
      }*/
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
