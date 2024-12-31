import { Component, inject } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { BoardsService } from '../services/boards.service';
import { ModalShowService } from '../services/modal-show.service';
import { CommonModule } from '@angular/common';
import { BoardsStore } from '../task-management/+store/boards.store';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule]
})
export class HeaderComponent {
  constructor(
    public colorTheme: ColorThemeService, 
    public sidebarService:SidebarToggleService,
    public boardsService: BoardsService,
    public modalShowService: ModalShowService 
    ) {}
    boardsStore = inject(BoardsStore);

    openEditBoardModal(){
      this.modalShowService.openEditBoardModal();
      this.modalShowService.closeEditDeleteContainer();
    }
    openDeleteBoardModal(){
      this.modalShowService.openDeleteBoardModal();
      this.modalShowService.closeEditDeleteContainer();
    }

    handleAddNewTask(){
      this.boardsService.currentTask.status = "";
      this.modalShowService.openCreateTaskModal();
    }

}
