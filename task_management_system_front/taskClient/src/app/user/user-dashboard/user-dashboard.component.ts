import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../todo-api/services/task.service';
import { AuthenticationService } from '../../../todo-api/services/authentication.service';
import { UserService } from '../../../todo-api/services/user.service';
import { Status } from '../../../todo-api/models/status_enum';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  userName: string | undefined = ' ';
  userId? : number | undefined;
  currentDate = new Date();
  taskSummery = { total: 0, inProgress: 0, completed: 0 };
  recentActivities: string[] = [];

  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthenticationService);

  ngOnInit(): void {
    this.userName = this.authService.getCurrentUser()?.name;
    this.userId = this.authService.getCurrentUser()?.userId;
    this.loadTaskSummery();
    // this.loadRecentActivities();
  }

  // navigateToTasks() {
  //   this.router.navigate(['/tasks-details']);
  // }

  navigateToProfile() {
    this.router.navigateByUrl('/profile');
  }

  navigateToMyTasks () {
    this.router.navigateByUrl('/my-tasks')
  }

  loadTaskSummery() {
    this.userService.getTaskByUserId(this.userId).subscribe({
      next : (tasks) => {
        this.taskSummery.total = tasks.length;
        this.taskSummery.inProgress = tasks.filter(task => (task.status ?? ' ').toString() === 'IN_PROGRESS').length;
        this.taskSummery.completed = tasks.filter(task => (task.status ?? ' ').toString() === 'COMPLETED').length
      }
    });
  }
}
