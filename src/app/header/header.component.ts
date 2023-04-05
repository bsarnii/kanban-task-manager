import { Component } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { CurrentBoardService } from '../services/current-board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public colorTheme: ColorThemeService, 
    public sidebarService:SidebarToggleService,
    public currentBoardService: CurrentBoardService 
    ) {}

}
