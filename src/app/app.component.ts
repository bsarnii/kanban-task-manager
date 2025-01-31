import { Component, inject, OnInit } from '@angular/core';
import { SidebarToggleService } from './services/sidebar-toggle.service';
import data from '../assets/data.json';
import { ModalShowService } from './services/modal-show.service';
import { ColorThemeService } from './services/color-theme.service';

import { BoardModalFrameComponent } from './shared/board-modal-frame/board-modal-frame.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { ConfirmDeleteBoardComponent } from "./confirm-delete-board/confirm-delete-board.component";
import { ConfirmDeleteTaskComponent } from "./confirm-delete-task/confirm-delete-task.component";
import { BoardsStore } from './task-management/+store/boards.store';
import { TasksStore } from './task-management/+store/tasks.store';
import { TaskModalFrameComponent } from './shared/task-modal-frame/task-modal-frame.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [BoardModalFrameComponent, SidebarComponent, HeaderComponent, MainComponent, TaskModalComponent, TaskModalFrameComponent, ConfirmDeleteBoardComponent, ConfirmDeleteTaskComponent],
    standalone: true
})
export class AppComponent implements OnInit {

  constructor (
    public sidebarService: SidebarToggleService,
    public modalShowService: ModalShowService,
    public colorThemeService:ColorThemeService
    ) {
      /*if (localStorage.getItem("boards") === null){
        boardsService.setBoards(data)
      }*/
      if (localStorage.getItem("lightMode") === null){
        colorThemeService.setTheme("false");
      }
      colorThemeService.getTheme();
    }
    boardsStore = inject(BoardsStore);
    tasksStore = inject(TasksStore);
    
  ngOnInit(){
    if (window.innerWidth <= 575){
      this.sidebarService.sidebarOpened = false;
    }
  }
}
