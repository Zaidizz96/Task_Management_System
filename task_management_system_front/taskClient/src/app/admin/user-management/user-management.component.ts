import { Component, inject, OnInit } from '@angular/core';
import { UserDto } from '../../../todo-api/models/user-dto';
import { UserService } from '../../../todo-api/services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Role } from '../../../todo-api/models/role_enum';
import { RegisterRequest } from '../../../todo-api/models/register-request';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit{

  router = inject(Router);
  formBuilder = inject(FormBuilder);

  userService = inject(UserService);

  users : UserDto[] = [];
  isEditUserModalOpen = false;
  editUserForm!: FormGroup;
  currentUserId: number | null  | undefined= null;
  isActive : boolean = false;

  roles = Object.values(Role);
  


  ngOnInit(): void {
    this.fetchUsers();    
    this.buildEditUserForm();
  }

  fetchUsers() {
    this.userService.query().subscribe({

      next : (response) => {
        this.users = response;
        console.log(response);
      },
      error : (error) => {
        console.log(error);
      }
    })
  }

  submitEditUser() : void {
    if(this.editUserForm.valid && this.currentUserId){
      const updatedUser : UserDto = {
        ...this.editUserForm.value,
        id : this.currentUserId
      } 
      this.userService.updateUser(updatedUser).subscribe({
        next : (resp) => {
          const index = this.users.findIndex(user => user.id === this.currentUserId);
          if(index !== -1){

            this.users[index] = {...this.users[index] , ...updatedUser}
          }
          window.location.reload()
          this.isEditUserModalOpen = false;
          console.log(resp);
          

        },error : (err) => {
          console.log(err);
        }
      })
    }
  }

  openEditUserModal(user : UserDto) : void{
    this.isEditUserModalOpen = true
    this.currentUserId = user.id;
    this.editUserForm.patchValue({
      name : user.name,
      email : user.email,
      role : user.role,
      active : user.active
    })
  }

 
  closeEditUserModal(): void {
    this.isEditUserModalOpen = false;
    this.currentUserId = null;
    this.editUserForm.reset();
  }

  navigateToAssignTask(userId: number) {
    this.router.navigate(['/add-task', { userId }]);
  }

  viewUserTasks(userId : number){
    this.router.navigate(['/todo-list' , userId])
  }

  buildEditUserForm(): void {
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      active: ['', Validators.required]  
    });
  }
  

  deleteUser(userId : number) {
    this.userService.deleteUser(userId).subscribe({
      next : () => {
       this.users= this.users.filter((user) => user.id !== userId);
        console.log('user deleted');
      }, 
      error : (error) => {
        console.log(error);
      }
    })
  }





}
