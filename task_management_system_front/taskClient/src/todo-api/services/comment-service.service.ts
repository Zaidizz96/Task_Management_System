import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../models/comment-dto';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  private baseUrl = 'http://localhost:8080/api/comments';

  constructor(private httpClient : HttpClient) {

   }

   getCommentByTaskId(taskId : number | undefined) : Observable<CommentDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<CommentDto[]> (`${this.baseUrl}/${taskId}`, {headers})
   }

   addCommentToTask(commentDto: CommentDto): Observable<CommentDto> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.httpClient.post<CommentDto>(`${this.baseUrl}`, commentDto, {headers});
  }

  deleteComment(commentId: number | undefined): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpClient.delete<void>(`${this.baseUrl}/${commentId}`, { headers });
  }
  
  


}
