import { inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

export function authTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authToken = inject(AuthService).getAuthToken();

    if(authToken) {
        const newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            },
        });

        return next(newReq);
    }

    return next(req);
  }