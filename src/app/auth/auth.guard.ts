import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.user.pipe(
    map(user => { return !!user }),
    tap(isAuth => {
      if (!isAuth) {
        router.navigate(['/auth']);
      }
    }
    )
  )
};
