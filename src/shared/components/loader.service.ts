import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject();
  public loader$ = this.loaderSubject.asObservable();

  constructor() { }

  startLoading(load: boolean): void{
    this.loaderSubject.next({load})
  }
}
