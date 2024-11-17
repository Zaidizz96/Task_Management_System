import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface ActivityLog {
  timeStamp: Date;
  action: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  httpClient = inject(HttpClient);

  constructor() {}

  private baseUrl = 'http://localhost:8080/admin/activity-logs';

  getActivityLogs() : Observable<ActivityLog[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.httpClient.get<ActivityLog[]> (`${this.baseUrl}` , {headers})
  }
}
