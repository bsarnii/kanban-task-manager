import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import appRoutes from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './app/core/interceptors/auth-token.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(
        withInterceptors([
          authTokenInterceptor
        ])
        ,),
      provideRouter(appRoutes, withComponentInputBinding())
    ],
  }).catch((err) => console.error(err));
