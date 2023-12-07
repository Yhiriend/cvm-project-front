import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import {
  addProductToCartResponse,
  buyCartResponse,
} from '../../../modules/cart/application/cart.actions';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private showToastSubject = new BehaviorSubject<boolean>(false);
  public showToast$ = this.showToastSubject.asObservable();
  store = inject(Store);

  constructor() {}

  show(): void {
    this.showToastSubject.next(true);
  }

  hide(): void {
    const response = { data: null };
    this.store.dispatch(addProductToCartResponse({ response }));
    //this.store.dispatch(buyCartResponse({ response }));
    this.showToastSubject.next(false);
  }
}
