import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public name = '';
  public welcomeMessageFromService = '';

  constructor(private route: ActivatedRoute,
    private welcomeDataService: WelcomeDataService) { }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
  }

  public getWelcomeMessage(): void {
    this.welcomeDataService.executeHelloWorldWithPathVariable(this.name).subscribe(res =>
      this.handleSuccessfulResponse(res),
      error => this.handleErrorfulResponse(error));
  }

  public handleSuccessfulResponse(response: any) {
    this.welcomeMessageFromService = response.message;
  }

  public handleErrorfulResponse(error: any) {
    this.welcomeMessageFromService = error.error.message;
  }

}
