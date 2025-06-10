import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  var service = inject(AuthService);
  var router = inject(Router);
  return service.isLoggedIn() ? true : router.navigate(['/auth/login']);
};
