import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../authService/auth.service';
import { Observable, Subject, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  /**
   * post a new debate
  **/
  postDebate(debate) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', this.authService.getToken());
    return this.http.post(environment.apiUrl + '/debates/post', debate, {headers: headers});
  }

  /**
   * get today's most popular debates
  **/
  getPopular(num) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + '/debates/popular?num=' + num, {headers: headers});
  }
}
