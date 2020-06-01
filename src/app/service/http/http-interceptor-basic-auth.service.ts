import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const basicAuthHeader = this.basicAuthenticationService.getAuthenticatedToken();
    const userName = this.basicAuthenticationService.getAuthenticatedUser();
    if (basicAuthHeader && userName) {
      request = request.clone({setHeaders: {Authorization: basicAuthHeader}});
    }
    return next.handle(request);
  }
}
