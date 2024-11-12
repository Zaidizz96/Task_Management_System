import { Component, inject, OnInit } from '@angular/core';
import { TaskDto } from '../../todo-api/models/task-dto';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../todo-api/services/task.service';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../comments/comments.component';
import { CommentDto } from '../../todo-api/models/comment-dto';
import { CommentServiceService } from '../../todo-api/services/comment-service.service';
import { UserService } from '../../todo-api/services/user.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, CommentsComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit{

  route = inject(ActivatedRoute);
  taskService = inject(TaskService);
  commecntService = inject(CommentServiceService);
  userService = inject(UserService);

  task : TaskDto | null= null;
  taskId? : number;
  userId? : number;
  comments : CommentDto[] = [];

  ngOnInit(): void {
    this.settingTaskIdAndUserId();
    this.loadComments();

    console.log(this.comments);
  }

  settingTaskIdAndUserId() : void {
    this.route.paramMap.subscribe(params => {
      const taskIdParam = params.get('taskId');
      const userIdParam = params.get('userId');

      if (taskIdParam) {
        this.taskId = parseInt(taskIdParam, 10);
      }
      
      if (userIdParam) {
        this.userId = parseInt(userIdParam, 10);
      }

      console.log(this.taskId , this.userId);
      
      this.loadTaskDetails();
    })
  }

  getUserNameById(): void {
    this.comments.forEach((comment) => {
      console.log(comment.userId);
      
      this.userService.getUserById(comment.userId).subscribe({
        next : (resp) => {
          comment['userName'] = resp.name;
          console.log(resp.name);
      
        },
        error : (error) => {
          console.log(error);
        }
      });
    });
  }

  
  loadComments(): void {
    this.commecntService.getCommentByTaskId(this.taskId).subscribe({
      next: (res) => {
        this.comments = res;
        this.getUserNameById();
        console.log(this.comments);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeDeletedComments(commentId : number) : void {
   this.comments =  this.comments.filter((comment) => comment.id !== commentId);
  }

 

  loadTaskDetails() : void {
    this.taskService.getById(this.taskId)?.subscribe({
      next : (resp) => {
        this.task = resp;
        console.log(resp);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }



}
