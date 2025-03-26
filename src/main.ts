import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import appRoutes from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(appRoutes, withComponentInputBinding())
    ],
  }).catch((err) => console.error(err));
