import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../todo-api/services/user.service';
import { TaskService } from '../../../todo-api/services/task.service';

@Component({
  selector: 'app-admin-statistics',
  standalone: true,
  imports: [],
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.scss'
})
export class AdminStatisticsComponent implements OnInit{

  totalUsers: number = 0;
  totalTasks: number = 0;
  completedTasks: number = 0;
  pendingTasks: number = 0;

  userService = inject(UserService);
  taskService = inject(TaskService);

  ngOnInit(): void {
    
    this.getAllStatistics();
  }

  getAllStatistics() : void {
    this.userService.query().subscribe({
      next : (users) => {
        this.totalUsers = users.length;
      },
      error : (err) => {
        console.log(err);
      }
    });


    this.taskService.findAllTasks().subscribe(({
      next : (tasks) => {
        this.totalTasks = tasks.length;
        this.pendingTasks = tasks.filter((task) => (task.status ?? '').toString() === 'PENDING').length;
        this.completedTasks = tasks.filter((task) => (task.status ?? '').toString() === 'COMPLETED').length;
      }
    }))
  }

}
