import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  constructor(private http: HttpClient) {}

  addToCart(cartId: number, productId: number): Observable<any> {
    const body = { cartId, productId };
    const url = `${environment.cartApi}/saveincart`;
    return this.http.post(url, body).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getCart(userId: number): Observable<any> {
    const body = { userId };
    const url = `${environment.cartApi}/getcart`;
    return this.http.post(url, body).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getCartByUserId(userId: number): Observable<any> {
    const body = { userId };
    const url = `${environment.cartApi}/getcart-by-userid`;
    return this.http.post(url, body).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
