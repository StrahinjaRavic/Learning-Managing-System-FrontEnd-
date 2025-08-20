import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        const rawError = err.error?.message || err.error || '';
        const errorMsg = typeof rawError === 'string' ? rawError : JSON.stringify(rawError);

        if (
          errorMsg.includes('Invalid JWT signature') ||
          errorMsg.includes('expired')
        ) {
          localStorage.removeItem('authToken');
          router.navigate(['/login']); 
        }else if(
          errorMsg.includes('Unauthorized') ||
          err.status === 401
        ){
          router.navigate(['/unauthorized']);
        }
      }
      return throwError(() => err);
    })
  );
};
