import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ReviewRequest } from '../domain/models/review-request.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewRequestApiService {
  constructor(private http: HttpClient) {}

  sendRequest(reviewRequest: ReviewRequest): Observable<any> {
    const body = reviewRequest;
    const url = `${environment.reviewRequestApi}/newrequest`;
    return this.http.post(url, body).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
