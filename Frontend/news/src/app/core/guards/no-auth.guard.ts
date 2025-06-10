import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {
  var service = inject(AuthService);
  var router = inject(Router);
  let isLoggedin: boolean = false;

  var sub = service.loginStatus$.subscribe((status) => {
    isLoggedin = status!;
  });

  if (service.isLoggedIn()) router.navigate(['/integration']);
  return service.isLoggedIn() ? false : true;
  // return isLoggedin ? false : true;
};
