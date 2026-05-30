import { Component, inject } from '@angular/core';
import { ButtonDirective, ButtonLabel } from "primeng/button";
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { ColorThemeService } from 'app/core/services/color-theme.service';
import { PublicFooterComponent } from "app/shared/ui/public-footer/public-footer.component";
import { PublicHeaderComponent } from "app/shared/ui/public-header/public-header.component";

@Component({
  selector: 'app-home-page',
  imports: [ButtonDirective, RouterLink, ButtonLabel, CardModule, PublicFooterComponent, PublicHeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  colorTheme = inject(ColorThemeService).colorTheme;
}
