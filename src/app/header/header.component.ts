import { Component, Input } from '@angular/core';
import { ColorThemeService } from '../services/color-theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public colorTheme: ColorThemeService ) {}

}
