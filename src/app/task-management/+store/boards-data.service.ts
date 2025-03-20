import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Board } from "../types/boards.interface";

@Injectable({ providedIn: 'root'})
export class BoardsDataService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getAll(): Observable<Board[]> {
        return this.http.get<Board[]>(`${this.apiUrl}/boards`);
    }
}