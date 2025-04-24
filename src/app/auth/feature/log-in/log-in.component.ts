import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LayoutComponent } from "../../ui/layout/layout.component";

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, LayoutComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export default class LogInComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');

  loading = signal(false);

  callback = (success:boolean) => {
    if(success){
      this.router.navigate(['board']).then(() => this.loading.set(false));
    }else{
      this.loading.set(false);
    }
  }

  logIn() {
    this.loading.set(true);
    this.authService.logIn(this.email(), this.password(), this.callback);
  }

  logInWithTestUser(){
    this.loading.set(true);
    this.authService.logIn('test@mykanbanapp.com', 'testmykanbanapp', this.callback);
  }
}
