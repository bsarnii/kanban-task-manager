import { Component } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor (public colorTheme:ColorThemeService) {}
  
}
