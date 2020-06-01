import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = '';
  public password = '';
  public errorMessage = 'Invalid credentials';
  public validLogin = true;

  constructor(private router: Router,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {}

  public handleBasicAuthLogin(): void {
    this.basicAuthenticationService.executeJWTBasicAuthentication(this.username, this.password).subscribe(response => {
      this.validLogin = true;
      this.router.navigate(['welcome', this.username]);
    }, error => {
      console.error(error);
      this.validLogin = false;
    });
  }

}
