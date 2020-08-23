import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  isLogged(): boolean {
    return this.authenticationService.isUserLoggedIn();
  }

}
