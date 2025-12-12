import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideSignalFormsConfig } from "@angular/forms/signals";
import { NG_STATUS_CLASSES } from "@angular/forms/signals/compat";

import { AppComponent } from './app/app.component';
import appRoutes from './app/app.routes';
import { authTokenInterceptor } from './app/core/interceptors/auth-token.interceptor';
import { unauthorizedInterceptor } from './app/core/interceptors/unauthorized.interceptor';


//PrimeNG
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';



bootstrapApplication(AppComponent, {
    providers: [
      provideZoneChangeDetection(),
      provideSignalFormsConfig({
        classes: NG_STATUS_CLASSES
      }),
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
