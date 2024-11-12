import { Component, inject, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../todo-api/services/task.service';
import { Status } from '../../todo-api/models/status_enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../todo-api/services/authentication.service';
import { TaskDto } from '../../todo-api/models/task-dto';
import { UserService } from '../../todo-api/services/user.service';
import { UserWithTasksAndCommentsDto } from '../../todo-api/models/UserWithTasksAndCommentsDto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  editTaskForm!: FormGroup;

  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthenticationService);
  userService = inject(UserService);
  taskService = inject(TaskService);
  formBuilder = inject(FormBuilder);

  userId!: number;
  userTasks: TaskDto[] = [];
  isEditModalOpen: boolean = false;
  currentTaskId: number | null | undefined;
  statusValues = Object.values(Status);
  isAdmin? : boolean

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.settingUserId();
    this.fetchUserTasksAndComments();
    this.buildingEditTaskForm();
  }

  buildingEditTaskForm(): void {
    this.editTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  openEditModal(task: TaskDto): void {
    this.currentTaskId = task.id;
    this.isEditModalOpen = true;
    this.editTaskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    });
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.currentTaskId = null;
  }

  submitEdit(): void {
    if (this.editTaskForm.valid && this.currentTaskId) {
      const updatedTask = {
        ...this.editTaskForm.value,
        id: this.currentTaskId,
      };
      this.taskService.updateTask(updatedTask).subscribe({
        next: (res) => {
          console.log('task updated succesfully');

          // This is for resitting the list after the update request done.
          const index = this.userTasks.findIndex(
            (task) => task.id === this.currentTaskId
          );
          if (index !== -1) {
            this.userTasks[index] = {
              ...this.userTasks[index],
              ...updatedTask,
            };
          }

          this.isEditModalOpen = false;
        },

        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  settingUserId(): void {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        console.log(userIdParam);

        this.userId = parseInt(userIdParam, 10);
        console.log(this.userId);
      } else {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.userId = currentUser.userId;
        } else {
          this.router.navigateByUrl('/login');
        }
      }
    });
  }

  fetchUserTasksAndComments(): void {
    this.userService.getTaskByUserId(this.userId).subscribe({
      next: (res) => {
        this.userTasks = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewTaskDetails(
    taskId: number | null | undefined,
    userId: number | undefined
  ): void {
    this.router.navigate(['/tasks-details', userId, taskId]);
  }

  deleteTask(taskId: number | undefined | null): void {
    if (taskId != null) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.userTasks = this.userTasks.filter((task) => task.id !== taskId);
          console.log(`Task deleted successfully.`);
        },
        error: (err) => {
          console.error('Error deleting task:', err);
        },
      });
    }
  }
}
