import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  darkBackground = false;

  showTaskModal = false;
  showEditTaskModal = false;
  showCreateTaskModal = false;

  showEditBoardModal = false;
  showCreatedBoardModal = false;

  openTaskModal(){
    this.darkBackground = true;
    this.showTaskModal = true;
  }
  openEditTaskModal(){
    this.showTaskModal = false;
    this.showEditTaskModal = true;
  }
  openCreateTaskModal(){
    this.showTaskModal = false;
    this.darkBackground = true;
    this.showCreateTaskModal = true;
  }
  openEditBoardModal(){
    this.darkBackground = true;
    this.showEditBoardModal = true;
  }
  openCreateBoardModal(){
    this.darkBackground = true;
    this.showCreatedBoardModal = true;
  }

  closeModal(){
    this.darkBackground = false;
    this.showTaskModal = false;
    this.showEditTaskModal = false;
    this.showCreateTaskModal = false;
    this.showCreatedBoardModal = false;
    this.showEditBoardModal = false;
  }

}
