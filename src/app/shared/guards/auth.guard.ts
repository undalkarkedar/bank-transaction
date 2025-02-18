import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
 const authService$ = inject(AuthService)
  const nav  = inject(Router)
    return authService$.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // Allow access to the route
        } else {
          nav.navigate(['/login']); // Redirect to login page
          return false;
        }
      })
    );
  }

