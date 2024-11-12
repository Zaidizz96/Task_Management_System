import { CommonModule } from '@angular/common';
import { Token } from '@angular/compiler';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '../../todo-api/services/authentication.service';

interface JwtPayload {
  userId: number;
  role: string;
  sub: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  dropDownOpen = false;

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  route = inject(Router);
  authenticationService = inject(AuthenticationService);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.isAuthenticated = this.checkAuthentication();
    this.isAdmin = this.checkAdminStatus();
  }

  checkAuthentication() : boolean{
   return this.authenticationService.isAuthenticated();
  }

  checkAdminStatus() : boolean {
    return this.authenticationService.isAdmin();
  }

  navigateToHome() {
    this.route.navigateByUrl('/')
  }

  navigateToProfilePage() {
    this.route.navigateByUrl('/profile')
  }

  loginNavigation(): void {
    this.route.navigate(['/login']);
  }

  navigateToTodos() : void{
    this.route.navigateByUrl('/todo-list');
  }

  signupNavigation(): void {
    this.route.navigate(['/register']);
  }

  navigateToAdminDashBoard(): void {
    this.route.navigateByUrl('/admin-dashboard');
  }

  navigateToUserDashboard() {
    this.route.navigateByUrl('/user-dashboard')
  }

  navigateToAddTask() {
    this.route.navigateByUrl('/add-task');
  }

  navigateToUsersPage() {
    this.route.navigateByUrl('/users');
  }

  
  clearToken() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.cdr.detectChanges(); 
    this.route.navigateByUrl('/login');
  }

  toggleDropDown(): void {
    this.dropDownOpen = !this.dropDownOpen;
    console.log(this.dropDownOpen);
  }

  closeDropDown(): void {
    this.dropDownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeDropDown();
    }
  }
}
