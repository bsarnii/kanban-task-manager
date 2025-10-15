import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from "../../ui/layout/layout.component";
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageModule } from "primeng/message";

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, LayoutComponent, RouterLink, MessageModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export default class LogInComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');

  errorMessage = signal('');
  loading = signal(false);

  logIn() {
    this.loading.set(true);
    this.authService.logIn(this.email(), this.password()).pipe(
      tap(res => this.onLoginSuccess(res)),
      catchError((err:HttpErrorResponse) => this.onLoginError(err))
    ).subscribe();
  }

  logInWithTestUser(){
    this.loading.set(true);
    this.authService.logIn('test@mykanbanapp.com', 'testmykanbanapp').pipe(
      tap(res => this.onLoginSuccess(res)),
      catchError((err:HttpErrorResponse) => this.onLoginError(err))
    ).subscribe();
  }

  onLoginSuccess(res: {access_token: string}){
    this.authService.setAuthToken(res.access_token)
    return this.router.navigate(['board']).then(() => this.loading.set(false));
  }

  onLoginError(err:HttpErrorResponse){
    this.loading.set(false);
    this.errorMessage.set(err.error.message || 'Something went wrong');
    return EMPTY;
  }
}
