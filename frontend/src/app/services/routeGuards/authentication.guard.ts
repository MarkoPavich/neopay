import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SessionService } from "../auth/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{

  constructor(private sessionService: SessionService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree{
      if(this.sessionService.isLoggedIn){
        return true;
      }
      return this.router.createUrlTree(['login']);
    }
}