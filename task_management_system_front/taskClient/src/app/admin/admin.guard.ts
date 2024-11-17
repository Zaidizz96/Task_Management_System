import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../todo-api/services/authentication.service';

interface RouteData {
  role: string; 
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  const currentUser = authenticationService.getCurrentUser();

  if (!currentUser) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const expectedRole = (route.data as RouteData).role;
  const userRole = currentUser.role;

  if (userRole === expectedRole) {
    return true;
  } else {
    if (userRole === 'USER'){
    router.navigate(['/user-dashboard']); 
    }else if(userRole === 'ADMIN'){
      router.navigate(['/admin-dashboard'])
    }
    return false;
  }
};
