import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../todo-api/services/user.service';
import { AuthenticationService } from '../../todo-api/services/authentication.service';
import { Validators } from '@angular/forms';
import { UserDto } from '../../todo-api/models/user-dto';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent implements OnInit{

  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthenticationService);


  profileForm! : FormGroup;
  passwordInvalid! : boolean;
  currentUserId! : number |undefined;
  showPassword: boolean = false;


  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.userId;
    this.buildForm();
    this.loadUserProfile();
  }

  buildForm() : void {
    const passwordPattern =
    /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&? "]).*$/;

    this.profileForm = this.formBuilder.group({
        name : ['' , Validators.required],
        email : ['' , [Validators.required, Validators.email]],
        password : ['' , [Validators.required , Validators.pattern(passwordPattern)]]
    })
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  loadUserProfile(): void {
    this.userService.getUserById(this.currentUserId).subscribe((user) => {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email
      });
      this.profileForm.get('password')?.setValue('');
    });
  }

  // checkEmailUnique(): void {
  //   const email = this.profileForm.get('email')?.value;
  //   this.userService.checkEmailUnique(email).subscribe((isTaken) => {
  //     this.emailInUse = isTaken;
  //   });
  // }

  submitProfile() : void {
    if (this.profileForm.valid) {
        const updatedUser = { ...this.profileForm.value, id: this.currentUserId };
        
        this.userService.updateUser(updatedUser).subscribe({
          next: (res) => {
            console.log('Profile updated successfully:', res);
          },
          error: (err) => {
            console.error('Error updating profile:', err);
          }
        });
      }else {
        this.passwordInvalid = !this.profileForm.get('password')?.valid;
      }
    }
  }

