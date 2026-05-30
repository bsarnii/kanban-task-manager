import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColorThemeService } from 'app/core/services/color-theme.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-public-header',
  imports: [RouterLink, ButtonModule],
  templateUrl: './public-header.component.html',
  styleUrl: './public-header.component.scss',
})
export class PublicHeaderComponent {
  colorTheme = inject(ColorThemeService).colorTheme;
}
