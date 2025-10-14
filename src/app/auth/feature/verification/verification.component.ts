import { Component, effect, inject, input, signal, untracked } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LayoutComponent } from "../../ui/layout/layout.component";
import { ColorThemeService } from 'src/app/core/services/color-theme.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verification',
  imports: [LayoutComponent, MessageModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.scss'
})
export default class VerificationComponent {
  router = inject(Router);
  messageService = inject(MessageService);
  authService = inject(AuthService);
  colorThemeService = inject(ColorThemeService);

  token = input<string>();

  loading = signal(false);
  hasError = signal(false);

  constructor(){
    effect(() => {
      const _token = this.token();
      untracked(() => {
        if(!!_token){
          this.loading.set(true);
          this.authService.sendVerificationToken(_token).pipe(
            tap((result) => {
              this.onVerificationSuccess(result.message);
            }),
            catchError(() => {
              this.loading.set(false);
              this.hasError.set(true);
              return EMPTY;
            })
          ).subscribe();
        }
      })
      if(_token){}
    })
  }

  onVerificationSuccess(message: string){
    this.loading.set(false);
    this.router.navigate(['/auth/login']).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: message,
        detail: message,
      });
    });
  }
}
