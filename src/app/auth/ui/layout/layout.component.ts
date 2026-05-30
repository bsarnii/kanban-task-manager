import { Component, input } from '@angular/core';
import { PublicFooterComponent } from "app/shared/ui/public-footer/public-footer.component";
import { PublicHeaderComponent } from "app/shared/ui/public-header/public-header.component";

@Component({
  selector: 'app-auth-layout',
  imports: [PublicFooterComponent, PublicHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  colorTheme = input<string>('light');
}
