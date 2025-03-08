import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogin = sessionStorage.getItem('authToken');
  const router = inject(Router);
  if (!isLogin) {
    router.navigate(['/auth'])
    return false;
  }
  return true;
};
