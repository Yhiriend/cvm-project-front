import { Component, Inject, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CardCreatorService } from '../../../modules/core/helpers/card-creator.service';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { getUser } from '../../../modules/user/application/user.actions';
import { getDataFromLocalStorage } from '../../utils/data-from-local-storage';
import { selectCurrentUser } from '../../../modules/user/application/user.selectors';
import {
  addProductToCart,
  addProductToCartInStore,
  addProductToCartResponse,
} from '../../../modules/cart/application/cart.actions';
import {
  selectCartProductAdded,
  selectCartState,
} from '../../../modules/cart/application/cart.selectors';
import { Subject, skip, take, takeLast, takeUntil } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css',
  imports: [ButtonComponent, CommonModule, MatIconModule],
})
export class ProductDialogComponent implements OnDestroy {
  msg = '';
  imageUrl = '';
  isUserValid = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardCreatorService: CardCreatorService,
    private dialogRef: MatDialogRef<ProductDialogComponent>,
    private readonly store: Store,
    private toastService: ToastService
  ) {
    if (data) {
      this.imageUrl = `../../../assets/images/pics/${this.data.product.image}`;
    }
    const token = getDataFromLocalStorage();
    if (token) {
      this.store.dispatch(getUser({ token }));
      this.store.select(selectCurrentUser).subscribe((user) => {
        if (user) {
          this.isUserValid = true;
          const response = {data: null}
          this.store.dispatch(addProductToCartResponse({response}))
        } else {
          this.isUserValid = false;
          this.msg = 'Primero debes iniciar sesión';
        }
      });
    }
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
  }

  getProductState(product: any) {
    return this.cardCreatorService.getState(Number(product.state));
  }

  onCloseModal() {
    this.dialogRef.close();
  }

  onAddToCart() {
    this.store
      .select(selectCartState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        if (this.isUserValid) {
          const product = this.data.product;
          const productId = product.id;
          this.store.dispatch(
            addProductToCart({ cartId: cart.id!, productId })
          );
          this.store
            .select(selectCartProductAdded).pipe(skip(1), take(1))
            .subscribe((added) => {
              if (added) {
                this.store.dispatch(addProductToCartInStore({ product }));
                this.toastService.show(
                  '✅ Se ha agregado un elemento a tu carrito!'
                );
              } else if (added === false) {
                this.toastService.show('❌ El producto ya está en el carrito');
              }
            });
          this.onCloseModal();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
