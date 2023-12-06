import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApiService {
  constructor(private http: HttpClient) {}

  signIn(userData: any): Observable<any> {
    const url = `${environment.authApi}/signin`;
    return this.http.post(url, userData).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  login(userData: any): Observable<any> {
    const url = `${environment.authApi}/login`;
    return this.http.post(url, userData).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getUser(token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        Authorization: `Bearer ${token}`,
      }),
    };
    const url = `${environment.authApi}/getuser`;
    return this.http.get(url, options).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
