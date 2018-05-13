import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Observable, Subject, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient,
              private jwtHelperService: JwtHelperService) { }

  /**
   * send a user registration request to back end
   *
   * @param    user new user object
  **/
  registerUser(user) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + '/users/register', user, { headers: headers });
  }

  /**
   * send a user authentication request to back end
   *
   * @param    user user object
  **/
  authUser(user) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + '/users/authenticate', user, { headers: headers });
  }

  /**
   * put user data into local storage
   *
   * @param    token user access token
   * @param    user user data object
  **/
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  /**
   * get user data from local storage
  **/
  localUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * check if the current user is logged in
  **/
  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter();

    if(!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    return token;
  }
  
  /**
   * log out the current user
  **/
  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
