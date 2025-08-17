import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const expectedRoles: string[] = route.data['roles'];
  const userRoles = authService.getUserRoles(); // ⬅ koristimo sigurnu metodu koja vraća []

  const hasAccess = expectedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    router.navigate(['/access-denied']);
    return false;
  }

  return true;
};
