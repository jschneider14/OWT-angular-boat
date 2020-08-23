import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  invalidLogin = false;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  onSubmit(form: NgForm) {

    if (!form.valid){
      return;
    }
    const value = form.value;
    console.log(value);

    this.authService.authenticate(value.username, value.password).subscribe(
      data => {
        this.router.navigate(['boats']);
        this.invalidLogin = false;
      }, error => {
        this.invalidLogin = true;
      }
    );

  }
}
