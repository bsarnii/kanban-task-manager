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
  showDeleteBoardModal = false;

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
  openDeleteBoardModal(){
    this.darkBackground = true;
    this.showDeleteBoardModal = true;
  }
  closeModal(){
    this.darkBackground = false;
    this.showTaskModal = false;
    this.showEditTaskModal = false;
    this.showCreateTaskModal = false;
    this.showDeleteBoardModal = false;
  }
  constructor() { }
}
