import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestServiceService {
  isloggedIn: boolean = false;
  userdetial!: any;
  userid!: any;
  constructor(private http: HttpClient) {}
  errorHandler(error: HttpErrorResponse) {
    throw throwError(() => new Error(error.message));
  }
  addUsers(users: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post('https://mines-api.vercel.app/api/auth', users, {
        headers: options,
      })
      .pipe();
  }
  getLogin(): Observable<any[]> {
    return this.http.get<any[]>('https://mines-api.vercel.app/api/auth/');
  }
  isUserAuthenticated(username: string, password: string): Observable<any[]> {
    return this.http.post<any[]>(
      'https://mines-api.vercel.app/api/auth/login',
      {
        email: username,
        password: password,
      }
    );
  }
  isUserLoggedIn(): boolean {
    if (this.userdetial) return true;
    else return false;
  }
  setUser(id: any, name: any) {
    localStorage.setItem('userid', id);
    localStorage.setItem('username', name);
  }
  getUser(id: string): any {
    if (id) {
      let us = this.http.get(`https://mines-api.vercel.app/api/auth/${id}`);

      return us;
    }
    return null;
  }
  removeUser() {
    localStorage.setItem('user', '');
  }
  getUserId(): any {
    return of(localStorage.getItem('userid'));
  }
  //add scores
  addScores(data: any) {
    return this.http.post<any[]>(
      'https://mines-api.vercel.app/api/score',
      data
    );
  }
  getScores() {
    return this.http.get<any[]>('https://mines-api.vercel.app/api/score');
  }
  getUserScores(id: string) {
    let us = this.http.get(`https://mines-api.vercel.app/api/score/${id}`);

    return us;
  }
}
