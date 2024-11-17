import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { authGuard } from './admin/admin.guard';
import { Role } from '../todo-api/models/role_enum';
import { AdminStatisticsComponent } from './admin/admin-statistics/admin-statistics.component';
import { ActivityLogComponent } from './admin/activity-log/activity-log.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'add-task',
    component: CreateTaskComponent, canActivate: [authGuard],
    data : {role : 'ADMIN'}
  },
  {
    path: 'users',
    component: UserManagementComponent,
    canActivate: [authGuard],
    data : {role : 'ADMIN'}
  },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard], data : {role : 'ADMIN'} },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
    data  : {role : 'ADMIN'}
  },
  { path: '', component: HomeComponent },
  { path: 'todo-list/:userId', component: TodoListComponent , canActivate : [authGuard], data :{role : 'ADMIN'}},
  { path: 'my-tasks', component: TodoListComponent },
  { path: 'tasks-details/:userId/:taskId', component: TaskDetailsComponent },
  {path : 'profile' , component : ProfileDetailsComponent},
  {path : 'user-dashboard', component : UserDashboardComponent , canActivate : [authGuard], data : {role : 'USER'}},
  { path: 'admin-statistics', component: AdminStatisticsComponent , canActivate : [authGuard], data :{role : 'ADMIN'}},
  {path: 'activity-logs' , component: ActivityLogComponent , canActivate : [authGuard] , data : {role : 'ADMIN'}}




];
