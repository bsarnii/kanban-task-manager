import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  sidebarOpened = true;
  selectedIndex= 0;

  toggleSidebar(){
    this.sidebarOpened = !this.sidebarOpened;
  }

  constructor() { }
}
