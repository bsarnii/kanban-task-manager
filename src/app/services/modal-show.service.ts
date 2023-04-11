import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  darkBackground = true;
  showTaskModal = false;
  showEditTaskModal = true;

  openTaskModal(){
    this.darkBackground = true;
    this.showTaskModal = true;
  }
  openEditTaskModal(){
    this.showTaskModal = false;
    this.showEditTaskModal = true;
  }

  closeModal(){
    this.darkBackground = false;
    this.showTaskModal = false;
    this.showEditTaskModal = false;
  }
  constructor() { }
}
