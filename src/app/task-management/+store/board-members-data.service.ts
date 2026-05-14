import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BoardMember, BoardMemberRole } from "../types/board-member.interface";

@Injectable({ providedIn: 'root'})
export class BoardMembersDataService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getAll(boardId:string): Observable<BoardMember[]> {
        return this.http.get<BoardMember[]>(`${this.apiUrl}/boards/${boardId}/board-members`);
    }

    add(boardId: string, email:string, role: BoardMemberRole): Observable<BoardMember> {
        return this.http.post<BoardMember>(`${this.apiUrl}/boards/${boardId}/board-members`, { email, role });
    }

    updateRole(boardId: string, id:string, role: BoardMemberRole): Observable<BoardMember> {
        return this.http.patch<BoardMember>(`${this.apiUrl}/boards/${boardId}/board-members/${id}`, { role });
    }

    delete(boardId: string, id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/boards/${boardId}/board-members/${id}`);
    }
}