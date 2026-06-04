import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {
  // By default, the sidebar is open on larger screens and closed on smaller screens
  sidebarOpened = signal(window.innerWidth <= 575 ? false : true);

  toggle(){
    this.sidebarOpened.set(!this.sidebarOpened());
  }

  open(){
    this.sidebarOpened.set(true);
  }

  close(){
    this.sidebarOpened.set(false);
  }
}
