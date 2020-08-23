import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
     }

     authenticate(username, password) {
      return this.httpClient.post<any>('http://localhost:8080/authenticate', {username, password}).pipe(
       map(
         userData => {
          sessionStorage.setItem('username', username);
          const tokenStr = userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
         }
       )

      );
    }


  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.clear();
  }

  get username() {
    return sessionStorage.getItem('username');
  }

  get token() {
    return sessionStorage.getItem('token');
  }
}
