import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../todo-api/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../todo-api/services/user.service';
import { debounceTime, of, switchMap } from 'rxjs';
import e from 'express';
import { CommonModule } from '@angular/common';
import { AuthenticationRequest } from '../../todo-api/models/authentication-request';
import { RegisterRequest } from '../../todo-api/models/register-request';
import { Role } from '../../todo-api/models/role_enum';

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  viewDatePicker = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {} 

  roles = Object.values(Role);
  ngOnInit(): void {
    this.buildSignupForm();
  }

  toggoleDatePicker(e: Event) {
    e.preventDefault();
    this.viewDatePicker = !this.viewDatePicker;
  }

  submitSignup() {

    let request: RegisterRequest = {

      name : this.signupForm.get('userData.name')?.value,
      email : this.signupForm.get('userData.email')?.value,
      password : this.signupForm.get('userData.password')?.value,
      role : this.signupForm.get('userData.role')?.value
    };

    console.log(this.role);
    

    this.authService.register(request).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/admin-dashboard');
      },
      error: (err) => {
        window.alert('User is already exist')
      },
    });
  }

  PasswordsMatches(g: FormGroup) {
    const passwordConfirm = g.get('passwordConfirm')?.value;
    const password = g.get('password')?.value;

    if (password !== passwordConfirm) {
      g.get('passwordConfirm')?.setErrors({ passwordMatchesError: true });
    } else {
    }
  }

  buildSignupForm() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern =
      /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&? "]).*$/;
   
      this.signupForm = this.formBuilder.group({
        userData: this.formBuilder.group({
          name: ['', [Validators.minLength(3), Validators.maxLength(15), Validators.required]],
          email: ['', [Validators.required, Validators.pattern(emailPattern)]],
          password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
          passwordConfirm: ['', [Validators.required]],
          role: ['', [Validators.required]]  
        })
      }, { validators: this.PasswordsMatches });
  }

  get email() {
    return this.signupForm.get('userData.email');
  }
  get password() {
    return this.signupForm.get('userData.password');
  }
  get passwordConfirm() {
    return this.signupForm.get('userData.passwordConfirm');
  }

  get name() {
    return this.signupForm.get('userData.name');
  }

  get role(){
    return this.signupForm.get('userData.role');
  }
}
