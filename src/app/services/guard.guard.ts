import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated() === true) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const canMatch: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated() === true) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
