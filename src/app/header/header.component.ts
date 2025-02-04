import { Component, inject } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
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
    boardsStore = inject(BoardsStore);
    colorThemeService = inject(ColorThemeService);
    sidebarService = inject(SidebarToggleService);
    modalShowService = inject(ModalShowService);

    openEditBoardModal(){
      this.modalShowService.openEditBoardModal();
      this.modalShowService.closeEditDeleteContainer();
    }
    openDeleteBoardModal(){
      this.modalShowService.openDeleteBoardModal();
      this.modalShowService.closeEditDeleteContainer();
    }

    handleAddNewTask(){
      this.modalShowService.openCreateTaskModal();
    }

}
