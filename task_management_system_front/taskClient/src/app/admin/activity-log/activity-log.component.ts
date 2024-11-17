import { Component, inject, OnInit } from '@angular/core';
import { ActivityLog, ActivityLogService } from '../../../todo-api/services/activity-log.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule , DatePipe],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss'
})
export class ActivityLogComponent implements OnInit {

  activityLogService = inject(ActivityLogService);

  logActivities : ActivityLog[] = [];

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities() {
    this.activityLogService.getActivityLogs().subscribe({
      next : (resp) => {
        this.logActivities = resp;
        console.log(resp);
        
      },
      error : (error) => {
        console.log(error);
      }
    })
  }

}
