import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from "../../ui/layout/layout.component";
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, LayoutComponent, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export default class LogInComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  email = signal('');
  password = signal('');

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
    this.messageService.add({
      severity: 'error',
      summary: 'HTTP Error',
      detail: err.error.message || 'Something went wrong',
    });
    return EMPTY;
  }
}
