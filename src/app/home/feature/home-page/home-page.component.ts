import { Component, inject } from '@angular/core';
import { ButtonDirective, ButtonLabel } from "primeng/button";
import { RouterLink } from '@angular/router';
import { ColorThemeService } from 'app/core/services/color-theme.service';

@Component({
  selector: 'app-home-page',
  imports: [ButtonDirective, RouterLink, ButtonLabel],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  colorTheme = inject(ColorThemeService).colorTheme;
}
