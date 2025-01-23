import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';  // To handle observable return
import { catchError, map } from 'rxjs/operators';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    map(response => {
      const isAuthenticated = response.body?.isLoggedIn;

      if (isAuthenticated) {
        router.navigate(['/']);
        return false;
      }
      
      return true;
    }),
    catchError(() => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
