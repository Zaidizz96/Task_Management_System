
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: number;
  role: string;
  sub : string;
  // Add other properties if needed
}

@Injectable({
  providedIn: 'root',
})



export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api/auth';

  private httpClient = inject(HttpClient);


  isAuthenticated(): boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }

  isAdmin() : boolean{
    if(this.getCurrentUser()?.role === 'ADMIN'){
      return true
    }
    return false;
  }

  constructor() {}
  

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      `${this.baseUrl}/authenticate`,
      request
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

 

  setRole(role : string) : void {
    localStorage.setItem('role' , role);
  }

  getRole() : string | null {
    return localStorage.getItem('role');
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  register(request : RegisterRequest) : Observable<AuthenticationResponse> {
    console.log(request)
    return this.httpClient.post<AuthenticationResponse> (`${this.baseUrl}/register` , request);
  }

  getCurrentUser(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwtDecode<JwtPayload>(token);
      return {userId : decodedToken.userId , role : decodedToken.role , name : decodedToken.sub};
    }
    return null;
  }
}
