import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SessionService } from '../auth/session.service';

@Injectable()
export class SecureHttpInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
          if (error.status === 401 && this.sessionService.isLoggedIn) {
            this.sessionService.clearSession();
            this.router.navigate(['login']);
            return EMPTY;
          } else if (error.error?.error_message) {
            this.toastr.error(error.error.error_message);
            return EMPTY;
          }
          this.toastr.error('Something went wront..');
          console.debug(error);
          return EMPTY;
        })
      );
  }
}
