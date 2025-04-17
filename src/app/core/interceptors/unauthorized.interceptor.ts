import { HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

export function unauthorizedInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const authService = inject(AuthService);
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
                authService.logOut();
            }
            throw err;
        })
    );
  }