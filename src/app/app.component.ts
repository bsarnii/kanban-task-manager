import { Component } from '@angular/core';
import { SidebarToggleService } from './services/sidebar-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (public sidebarService: SidebarToggleService) {}

}
