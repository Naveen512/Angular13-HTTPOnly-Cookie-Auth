import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { catchError, Observable, switchMap, throwError } from 'rxjs';
  import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private route: Router) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (req.url.indexOf('/refresh-token') > -1) {
        return next.handle(req);
      }
      return next.handle(req).pipe(
        catchError((error) => {
          if (error.status == 401) {
            return this.handle401Error(req, next, error);
          } else {
            return throwError(() => error);
          }
        })
      );
    }
  
    private handle401Error(
      req: HttpRequest<any>,
      next: HttpHandler,
      originalError: any
    ) {
      return this.authService.refreshCookie().pipe(
        switchMap(() => {
          return next.handle(req);
        }),
        catchError((error) => {
          localStorage.removeItem('user-profile');
  
          this.route.navigate(['/']);
          return throwError(() => originalError);
        })
      );
    }
  }
  