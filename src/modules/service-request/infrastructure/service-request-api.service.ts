import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRequest } from '../domain/models/service-request.model';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestApiService {
  constructor(private http: HttpClient) {}

  sendRequest(serviceRequest: ServiceRequest): Observable<any> {
    const body = serviceRequest;
    const url = `${environment.serviceRequestApi}/newrequest`;
    return this.http.post(url, body).pipe(
      map((response) => response),
      catchError((error: any) => {
        throw error;
      })
    );
  }
}
