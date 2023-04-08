import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalShowService {
  darkBackground = false;
  showTaskModal = false;

  openTaskModal(){
    this.darkBackground = true;
    this.showTaskModal = true;
  }

  closeModal(){
    this.darkBackground = false;
    this.showTaskModal = false;
  }
  constructor() { }
}
