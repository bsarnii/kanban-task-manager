import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from "../../ui/layout/layout.component";

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, RouterLink, LayoutComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export default class LogInComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');

  logIn() {
    const callback = () => {
      this.router.navigate(['board']);
    }
    this.authService.logIn(this.email(), this.password(), callback);
  }
}
