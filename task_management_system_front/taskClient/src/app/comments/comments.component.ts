import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommentDto } from '../../todo-api/models/comment-dto';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentServiceService } from '../../todo-api/services/comment-service.service';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../todo-api/services/user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit , AfterViewInit{
  commentForm!: FormGroup;

  commentService = inject(CommentServiceService);
  formBuilder = inject(FormBuilder);
  userService = inject(UserService);

  @Input() taskId?: number;
  @Input() userId?: number;
  @Input() comments: CommentDto[] = [];

  @Output() commentDeleted = new EventEmitter<number>();

  ngOnInit(): void {    
    this.buildCommentForm();
  }

  ngAfterViewInit(): void {
    console.log(this.comments);
    
  }

  buildCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  deleteComment(commentId: number | undefined): void {
    if (commentId != null) {
      this.commentService.deleteComment(commentId).subscribe({
        next: () => {
          this.commentDeleted.emit(commentId); 
        },
        error: (err) => console.error("Error deleting comment:", err),
      });
    }
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      const commentDto: CommentDto = {
        taskId: this.taskId,
        userId: this.userId,
        commentText: this.commentForm.get('content')?.value || '',
      };

      console.log(commentDto);

      this.commentService.addCommentToTask(commentDto).subscribe({
        next: (res) => {
          this.comments.push(res);
          this.commentForm.reset();
          console.log('Comment added successfully');
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        },
      });
    }
  }
}
