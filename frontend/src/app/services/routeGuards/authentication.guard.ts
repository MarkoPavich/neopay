import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionService } from '../auth/session.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private authService: AuthService
  ) {
    router.errorHandler = (error: any) => {
      router.navigate(['login']);
    };
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.sessionService.isLoggedIn) {
      return true;
    }

    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      return this.authService.refresh(refreshToken).pipe(
        map((succeeded: boolean | null) => {
          if (succeeded) {
            return true;
          }
          return this.router.createUrlTree(['login']);
        })
      );
    } else {
      return this.router.createUrlTree(['login']);
    }
  }
}
