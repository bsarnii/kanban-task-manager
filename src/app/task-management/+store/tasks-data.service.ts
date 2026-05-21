import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { Task, TaskInputDto } from "../types/task.interface";

@Injectable({ providedIn: 'root'})
export class TasksDataService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getAll(boardId:string): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/boards/${boardId}/tasks`);
    }

    create(boardId: string, task: TaskInputDto): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/boards/${boardId}/tasks`, task);
    }

    update(boardId: string, id:string, task: Partial<TaskInputDto>): Observable<Task> {
        return this.http.patch<Task>(`${this.apiUrl}/boards/${boardId}/tasks/${id}`, task);
    }

    delete(boardId: string, id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/boards/${boardId}/tasks/${id}`);
    }

    sortTasks(boardId: string, taskIds: string[]): Observable<Task[]> {
        return this.http.post<Task[]>(`${this.apiUrl}/boards/${boardId}/tasks/sort`, taskIds);
    }
}