import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('auth_token');
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
