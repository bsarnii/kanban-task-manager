import { Component, inject, signal } from '@angular/core';
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { LayoutComponent } from '../../ui/layout/layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type SignUpFormModel = {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  imports: [LayoutComponent, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export default class SignUpComponent {
  colorThemeService = inject(ColorThemeService);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  model = signal<SignUpFormModel>({
    name: '',
    email: '',
    password: ''
  })

  signUpSuccess = signal(false);
  loading = signal(false);
  resendLoading = signal(false);


  signUp(form:NgForm) {
    if(form.invalid) {
      return;
    }
    this.loading.set(true);
    this.authService.signUp(this.model()).pipe(
      tap(() => {
        this.signUpSuccess.set(true);
        this.loading.set(false);
      }),
      catchError((err:HttpErrorResponse) => {
          this.loading.set(false);
          this.messageService.add({
              severity: 'error',
              summary: 'HTTP Error',
              detail: err.error.message || 'Something went wrong',
          });
          return EMPTY;
      })
    ).subscribe();
  }

  resendVerificationEmail() {
    if(this.resendLoading()) return;

    this.resendLoading.set(true);

    this.authService.resendVerificationEmail(this.model().email).pipe(
      tap(() => {
        this.resendLoading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Verification Email Resent',
          detail: 'You should receive an email shortly',
        });
      }),
      catchError((err:HttpErrorResponse) => {
          this.resendLoading.set(false);
          this.messageService.add({
              severity: 'error',
              summary: 'HTTP Error',
              detail: err.error.message || 'Something went wrong',
          });
          return EMPTY;
      })
    ).subscribe();
  }
}
