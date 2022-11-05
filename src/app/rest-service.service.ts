import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestServiceService {
  isloggedIn: boolean = false;
  userdetial!: any;
  userid!: any;
  constructor(private http: HttpClient) {}
  addUsers(users: any): Observable<any> {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post('/api/auth', users, { headers: options }).pipe();
  }
  getLogin(): Observable<any[]> {
    return this.http.get<any[]>('/api/auth/');
  }
  isUserAuthenticated(username: string, password: string): Observable<any[]> {
    return this.http.post<any[]>('/api/auth/login', {
      email: username,
      password: password,
    });
  }
  isUserLoggedIn(): boolean {
    if (this.userdetial) return true;
    else return false;
  }
  setUser(id: any, name: any) {
    localStorage.setItem('userid', id);
    localStorage.setItem('username', name);
  }
  getUser(): any {
    this.userid = localStorage.getItem('userid');
    if (this.userid) {
      let us = this.http.get(`/api/auth/${this.userid}`);

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
    return this.http.post<any[]>('/api/score', data);
  }
  getScores() {
    return this.http.get<any[]>('/api/score');
  }
}
