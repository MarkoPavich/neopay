import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SessionService } from '../auth/session.service';

@Injectable()
export class SecureHttpInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.sessionService.startLoading();

    return next.handle(request).pipe(
      finalize(() => {
        this.sessionService.completeLoading();
      })
    );
  }
}
