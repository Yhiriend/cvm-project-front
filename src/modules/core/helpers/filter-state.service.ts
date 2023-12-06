import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>({});
  data$ = this.dataSubject.asObservable();
  private productFilteredSubject = new BehaviorSubject<number>(0);
  productFiltered$ = this.productFilteredSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  sendProductFiltered(products: number) {
    this.productFilteredSubject.next(products);
  }
}
