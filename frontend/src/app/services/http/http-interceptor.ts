import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable} from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SessionService } from '../auth/session.service';

@Injectable()
export class SecureHttpInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.sessionService.startLoading();

    return next
      .handle(request)
      .pipe(
        finalize(() => {
          this.sessionService.completeLoading();
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.sessionService.clearSession();
            this.router.navigate(['login']);
          }
          console.error(error);
          return EMPTY;
        })
      );
  }
}
