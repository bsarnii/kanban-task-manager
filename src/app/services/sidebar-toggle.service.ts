import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  sidebarOpened = true;

  toggleSidebar(){
    this.sidebarOpened = !this.sidebarOpened;
  }

  constructor() { }
}
