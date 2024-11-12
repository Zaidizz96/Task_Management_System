import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../todo-api/services/authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgStyle } from '@angular/common';
import { AuthenticationResponse } from '../../todo-api/models/authentication-response';
import { AuthenticationRequest } from '../../todo-api/models/authentication-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgStyle, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthenticationService, 
    private router :Router) { }

  loginForm! : FormGroup;

  badCredentialMessage = false;

  ngOnInit(): void {
    
    this.buildSigninForm();
  }

  submitLogin() {  
    
    const username = this.loginForm.get('userData.username')?.value;
    const password = this.loginForm.get('userData.password')?.value;

    console.log('username :' + username + 'password' + password);

    const credentials : AuthenticationRequest= {
        username : username,
        password : password
    }

    this.authService.login(credentials).subscribe({
      next : (response) => {
        this.authService.setToken(response.token);
        console.log(response);
        if(this.authService.isAdmin()){
          this.router.navigateByUrl('/admin-dashboard');
        }else if(!this.authService.isAdmin()){
          this.router.navigateByUrl('/user-dashboard');
        }else{
          // this.router.navigateByUrl('/todo-list');
        }
      },

      error : (error) => {
        this.badCredentialMessage = true;
      }
    })

  }

  buildSigninForm() {
    const passwordPattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[@!#$%&? "]).*$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    this.loginForm = this.formBuilder.group({
      userData : this.formBuilder.group({
        username : new FormControl('' , [Validators.required , Validators.pattern(emailPattern)]),
        password : new FormControl('' , [Validators.required , Validators.pattern(passwordPattern)]) 
      })
    })

  }

}
