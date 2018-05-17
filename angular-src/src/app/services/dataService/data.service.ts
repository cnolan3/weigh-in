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
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authService.getToken());
    return this.http.post(environment.apiUrl + '/debates/post', debate, {headers: headers});
  }

  /**
   * get debate vote results
  **/
  getResults(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('debateId', id);
    return this.http.get(environment.apiUrl + '/debates/results', {params: params, headers: headers});
  }

  /**
   * get categories
  **/
  getCategories() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + '/debates/topics', {headers: headers});
  }

  /**
   * get today's most popular debates
  **/
  getPopular(num) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('num', num);
    return this.http.get(environment.apiUrl + '/debates/popular', {headers: headers, params: params});
  }

  /**
   * get latest debates
  **/
  getLatest(num) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('num', num);
    return this.http.get(environment.apiUrl + '/debates/latest', {params: params, headers: headers});
  }

  /**
   * get featured debates
  **/
  getFeatured() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(environment.apiUrl + '/debates/featured', {headers: headers});
  }

  /**
   * get a debate by id
  **/
  getDebateById(id) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('id', id);
    return this.http.get(environment.apiUrl + '/debates/debate', {params: params, headers: headers});
  }

  /**
   * search debates
  **/
  searchDebates(searchVal, num, off) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('title', searchVal)
      .set('num', num)
      .set('off', off)
    return this.http.get(environment.apiUrl + '/debates/', {params: params, headers: headers});
  }

  /**
   * submit vote
  **/
  vote(v) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authService.getToken());
    return this.http.post(environment.apiUrl + '/debates/vote', v, {headers: headers});
  }
}
