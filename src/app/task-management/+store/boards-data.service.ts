import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Board, BoardInputDto } from "../types/boards.interface";

@Injectable({ providedIn: 'root'})
export class BoardsDataService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getAll(): Observable<Board[]> {
        return this.http.get<Board[]>(`${this.apiUrl}/boards`);
    }

    create(board: BoardInputDto): Observable<Board> {
        return this.http.post<Board>(`${this.apiUrl}/boards`, board);
    }

    update(id:string, board: Partial<BoardInputDto>): Observable<Board> {
        return this.http.patch<Board>(`${this.apiUrl}/boards/${id}`, board);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/boards/${id}`);
    }
}