import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../types/user.interface";

type JwtAuthTokenPayload = {
    userId: string;
    email: string;
    iat: number;
    exp: number;
  };

@Injectable({providedIn: 'root'})
export class UsersDataService {
    htto = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getUser():Observable<User>{
        return this.htto.get<JwtAuthTokenPayload>(`${this.apiUrl}/users/whoami`).pipe(map(res => ({
            id: res.userId,
            email: res.email
        })))
    }

}