import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loadingSubject = new BehaviorSubject<boolean>(false);

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  getLoading$() {
    return this.loadingSubject.asObservable();
  }
}
