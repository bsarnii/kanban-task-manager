import { Component, inject } from '@angular/core';
import { BoardsStore } from './+store/boards.store';
import { TasksStore } from './+store/tasks.store';
import { SidebarToggleService } from './layout/sidebar/sidebar-toggle.service';
import { HeaderComponent } from "./layout/header/header.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-management',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.scss'
})
export class TaskManagementComponent {
  sidebarService = inject(SidebarToggleService);
  boardsStore = inject(BoardsStore);
  tasksStore = inject(TasksStore);

  ngOnInit(){
    if (window.innerWidth <= 575){
      this.sidebarService.sidebarOpened = false;
    }
  }
}
