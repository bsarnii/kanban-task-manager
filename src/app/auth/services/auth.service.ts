import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UsersStore } from "src/app/users/+store/users.store";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    usersStore = inject(UsersStore);
    router = inject(Router);

    logIn(email: string, password: string, callback: VoidFunction) {
        return this.http.post<{access_token: string}>(`${this.apiUrl}/auth/login`, {email, password}).subscribe((res => {
            this.setAuthToken(res.access_token);
            callback();
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