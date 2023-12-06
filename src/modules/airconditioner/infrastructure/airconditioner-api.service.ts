import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AirconditionerApiService {
  constructor(private http: HttpClient) {}

  getNewest(): Observable<any> {
    const url = `${environment.productApi}/getnewest`;
    return this.http.get(url).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getProducts(keywords: string): Observable<any> {
    const body = { keywords };
    const url = `${environment.productApi}/searchproducts`;
    return this.http.post(url, body).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
