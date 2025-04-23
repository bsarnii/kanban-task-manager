import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY } from "rxjs";
import { UsersStore } from "src/app/users/+store/users.store";
import { environment } from "src/environments/environment";
import { MessageService } from "primeng/api";

@Injectable({providedIn: 'root'})
export class AuthService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    usersStore = inject(UsersStore);
    router = inject(Router);
    messageService = inject(MessageService);

    logIn(email: string, password: string, callback: (success:boolean) => void) {
        return this.http.post<{access_token: string}>(`${this.apiUrl}/auth/login`, {email, password}).pipe(
            catchError((err:HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'HTTP Error',
                    detail: err.error.message || 'Something went wrong',
                  });
                callback(false);
                return EMPTY;
            })
        ).subscribe((res => {
            this.setAuthToken(res.access_token);
            callback(true);
        }));
    }

    signUp(signUpInputDTO: {name: string, email: string, password: string}, callback: (success:boolean) => void) {
        return this.http.post<unknown>(`${this.apiUrl}/users/signup`, signUpInputDTO).pipe(
            catchError((err:HttpErrorResponse) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'HTTP Error',
                    detail: err.error.message || 'Something went wrong',
                  });
                callback(false);
                return EMPTY;
            })
        ).subscribe((() => {
            callback(true);
        }));
    }

    setAuthToken(token:string){
        localStorage.setItem('access_token', token);
    }

    getAuthToken():string | null{
        return localStorage.getItem('access_token');
    }

    logOut(){
        localStorage.removeItem('access_token');
        this.usersStore.clearCurrentUser();
        this.router.navigate(['/auth']);
    }
}