import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.sessionService.isLoggedIn) return next.handle(request);

    if (this.sessionService.tokenExpired) {
      this.sessionService.clearSession();
      this.router.navigate(['login']);
      return EMPTY;
    }

    if (
      this.sessionService.shouldRefresh &&
      !this.sessionService.isRefreshing
    ) {
      this.authService.refresh(this.sessionService.refreshToken).subscribe();
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sessionService.authToken}`,
      },
    });

    return next.handle(request);
  }
}
