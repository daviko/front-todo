import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

export class AuthenticationBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  public executeJWTBasicAuthentication(userName: string, password: string): Observable<any> {
    const body = { username: userName, password: password };
    return this.http.post<any>(`${API_URL}/authenticate`, body).pipe(
      map(data => {
        sessionStorage.setItem('authenticaterUser', userName);
        sessionStorage.setItem('token', `Bearer ${data.token}`);
        return data;
      })
    );
  }

  public executeBasicAuthentication(userName: string, password: string): Observable<AuthenticationBean> {
    const basicAuthHeader = 'Basic ' + window.btoa(userName + ':' + password);
    const header = new HttpHeaders({Authorization: basicAuthHeader});
    
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, {headers: header}).pipe(
      map(data => {
        sessionStorage.setItem('authenticaterUser', userName);
        sessionStorage.setItem('token', basicAuthHeader);
        return data;
      })
    );
  }

  public executeHelloWorldWithPathVariable(name: string): Observable<AuthenticationBean> {
    return this.http.get<AuthenticationBean>(`${API_URL}/hello-world/${name}`);
  }

  public getAuthenticatedUser(): string {
    return sessionStorage.getItem('authenticaterUser');
  }

  public getAuthenticatedToken(): string {
    return this.getAuthenticatedUser() ? sessionStorage.getItem('token') : null;
  }

  public isUserLoggedIn(): boolean {
    return sessionStorage.getItem('authenticaterUser') !== null;
  }

  public logout(): void {
    sessionStorage.removeItem('authenticaterUser');
    sessionStorage.removeItem('token');
  }
}
