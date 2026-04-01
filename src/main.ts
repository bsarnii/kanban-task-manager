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
import { definePreset } from '@primeng/themes';
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
            preset: definePreset(Aura, {
              semantic: {
                primary: {
                    50: '{indigo.50}',
                    100: '{indigo.100}',
                    200: '{indigo.200}',
                    300: '{indigo.300}',
                    400: '{indigo.400}',
                    500: '{indigo.500}',
                    600: '{indigo.600}',
                    700: '{indigo.700}',
                    800: '{indigo.800}',
                    900: '{indigo.900}',
                    950: '{indigo.950}'
                }
              }
            }),
            options: {
              darkModeSelector: '.my-app-dark',
              
            } 
          }
      }),
      MessageService
    ],
  }).catch((err) => console.error(err));
