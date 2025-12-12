import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LayoutComponent } from "../../ui/layout/layout.component";
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageModule } from "primeng/message";
import {form, Field, required, email, submit} from '@angular/forms/signals';
import { FieldWrapperComponent } from "src/app/shared/ui/form/field-wrapper/field-wrapper.component";

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, LayoutComponent, RouterLink, MessageModule, Field, FieldWrapperComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export default class LogInComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);
  router = inject(Router);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email), {message: 'Email is required'};
    email(schemaPath.email);

    required(schemaPath.password, {message: 'Password is required'});
  });

  errorMessage = signal('');
  loading = signal(false);

  logIn() {
    submit(this.loginForm, async () => {
      this.loading.set(true);
      this.authService.logIn(this.loginModel().email, this.loginModel().password).pipe(
        tap(res => this.onLoginSuccess(res)),
        catchError((err:HttpErrorResponse) => this.onLoginError(err))
      ).subscribe();
    })
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

