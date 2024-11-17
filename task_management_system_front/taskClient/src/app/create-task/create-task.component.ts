import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../../todo-api/services/task.service';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Status } from '../../todo-api/models/status_enum';
import { TaskDto } from '../../todo-api/models/task-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '../../todo-api/models/user-dto';
import { UserService } from '../../todo-api/services/user.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  taskService = inject(TaskService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  userService = inject(UserService);
  route = inject(ActivatedRoute);

  taskForm!: FormGroup;
  users: UserDto[] = [];
  statusValues = Object.values(Status);
  assignedUserId: string | null = null;

  ngOnInit(): void {
    // Check if a user ID was provided in the route parameters
    this.route.paramMap.subscribe(params => {
      this.assignedUserId = params.get('userId');  
      this.fetchUsers();
      this.buildTaskForm();
    });
  }

  fetchUsers() {
    this.userService.query().subscribe((users) => {
      this.users = users;
    });
  }

  buildTaskForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: [null, Validators.required],
      dueDate: ['', Validators.required],
      userId: [this.assignedUserId || '', Validators.required],  
    });

    if (this.assignedUserId) {
      this.taskForm.get('userId')?.disable();  
    }
  }

  onSubmit(): void {
    const title = this.taskForm.get('title')?.value;
    const description = this.taskForm.get('description')?.value;
    const status = this.taskForm.get('status')?.value;
    const dueDate = this.taskForm.get('dueDate')?.value.toString();
    const userId = this.taskForm.get('userId')?.value; 

    const taskObject: TaskDto = {
      title: title,
      description: description,
      status: status,
      dueDate: dueDate,
      userId: userId,
    };

    this.taskService.createTask(taskObject).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl('/users');
        window.alert('task added successfully')
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
