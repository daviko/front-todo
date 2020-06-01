import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  private header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({Authorization: this.createBasicAuthHeader()});
  }

  private createBasicAuthHeader(): string {
    const userName = 'user';
    const password = 'user';
    return 'Basic ' + window.btoa(userName + ':' + password);
  }

  public executeHelloWorldBeanService(): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean`, {headers: this.header});
  }

  public executeHelloWorldWithPathVariable(name: string): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/${name}`);
  }
}
