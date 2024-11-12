import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskDto } from '../models/task-dto';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Status } from '../models/status_enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor() {}

  createTask(task: TaskDto): Observable<TaskDto> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User is not authenticated.');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.post<TaskDto>(`${this.baseUrl}`, task, { headers });
  }

  getById(taskId: number | undefined): Observable<TaskDto> | null {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    if(taskId){
    return this.httpClient.get<TaskDto>(`${this.baseUrl}/${taskId}`, {
      headers,
    });
  }
  return null;
  }

  getAll(status?: string, projectId?: number): Observable<TaskDto[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }
    if (projectId) {
      params = params.set('projectId', projectId.toString());
    }
    return this.httpClient.get<TaskDto[]>(this.baseUrl, { params: params });
  }

  deleteTask(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }

  updateTaskStatus(
    taskId: number | undefined,
    status: Status | undefined
  ): Observable<TaskDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.put<TaskDto>(
      `${this.baseUrl}/${taskId}/status`,
      status,
      { headers }
    );
  }

  findAllTasks() : Observable<TaskDto[]>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<TaskDto[]>(`${this.baseUrl}` , {headers});
  }

  updateTask(updatedTask: TaskDto): Observable<TaskDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.put<TaskDto>(
      `${this.baseUrl}/${updatedTask.id}`,
      updatedTask,
      { headers }
    );
  }
}
