import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import appRoutes from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './app/core/interceptors/auth-token.interceptor';

//PrimeNG
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { unauthorizedInterceptor } from './app/core/interceptors/unauthorized.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
      provideZoneChangeDetection(),
      provideHttpClient(
        withInterceptors([
          authTokenInterceptor,
          unauthorizedInterceptor
        ])
        ,),
      provideRouter(appRoutes, withComponentInputBinding()),
      provideAnimationsAsync(),
      providePrimeNG({
          theme: {
              preset: Aura
          }
      }),
      MessageService
    ],
  }).catch((err) => console.error(err));
