import { Component } from '@angular/core';
import { AuthenticationService } from '../../../todo-api/services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  adminName: string = '';
  adminRoutes = [
      { path: '/users', label: 'Manage Users' },
      { path: '/admin-statistics', label: 'View Reports' },
      
  ];

  constructor(private authService: AuthenticationService, private router: Router) {}
  
  ngOnInit(): void {
      this.adminName = this.authService.getCurrentUser()?.name || 'Admin';
  }

  navigateTo(path: string) {
      this.router.navigateByUrl(path);
  }
}
