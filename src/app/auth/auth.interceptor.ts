import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { AuthResponseData, AuthService } from './auth.service';
import { User } from './user.model';
import { exhaustMap, take, tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = Inject(AuthService);
  // return authService.user.pipe(
  //   tap(res => {
  //     console.log(res);
  //   }),
  //   take(1),
  //   exhaustMap<AuthResponseData>(user => {
  //     console.log(user);
  //     const modifiedRequest = req.clone({
  //       params: new HttpParams().set('Authorization', 'ext')
  //     });
  //     return next(modifiedRequest);
  //   })
  // );

  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    const modifiedRequest = req.clone({
      params: new HttpParams().set('auth', userData._token)
    });
    return next(modifiedRequest);
  }
  return next(req);
}