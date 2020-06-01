import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { BasicAuthenticationService } from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router,
    private basicAuthenticationService: BasicAuthenticationService) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const canActivate = this.basicAuthenticationService.isUserLoggedIn();
    if (!canActivate) {
      this.router.navigate(['login']);
    }
    return canActivate;
  }
}
