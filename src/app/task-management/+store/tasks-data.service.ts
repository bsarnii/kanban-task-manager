import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Task, TaskInputDto } from "../types/task.interface";

@Injectable({ providedIn: 'root'})
export class TasksDataService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;

    getAll(boardId:string): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/boards/${boardId}/tasks`);
    }

    create(task: TaskInputDto): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
    }

    update(id:string, task: Partial<TaskInputDto>): Observable<Task> {
        return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`, task);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
    }

    sortTasks(taskIds: string[]): Observable<Task[]> {
        return this.http.post<Task[]>(`${this.apiUrl}/tasks/sort`, taskIds);
    }
}