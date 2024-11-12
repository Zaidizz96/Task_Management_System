import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user-dto';
import { TaskDto } from '../models/task-dto';
import { HttpHeaders } from '@angular/common/http';
import { Status } from '../models/status_enum';
import { UserWithTasksAndCommentsDto } from '../models/UserWithTasksAndCommentsDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private httpClient = inject(HttpClient);

  constructor() { 
  }

  status = Object.values(Status);

  private baseUrl = 'http://localhost:8080/api/users';

  query() : Observable<UserDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<UserDto[]>(`${this.baseUrl}` , {headers})
  }

  getUserById(id : number | undefined) : Observable<UserDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<UserDto>(`${this.baseUrl}/${id}` , {headers}) 
  }

  deleteUser(id : number) : Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {headers})
  }

  getTaskByUserId(userId : number | undefined) : Observable<TaskDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<TaskDto[]>(`${this.baseUrl}/${userId}/tasks` , {headers})
  }

  getUserEmails() : Observable<String[]> {
   return this.httpClient.get<String[]>(`${this.baseUrl}/emails`);
  }

  updateUser(user: UserDto): Observable<UserDto> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<UserDto>(`${this.baseUrl}/${user.id}`, user, { headers });
  }


  getUserWithTasksAndComments(userId: number): Observable<UserWithTasksAndCommentsDto> {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get<UserWithTasksAndCommentsDto>(`${this.baseUrl}/${userId}/tasks-comments` , {headers});
  }

  checkEmailUnique(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/check-email?email={email}`);
  }

}
