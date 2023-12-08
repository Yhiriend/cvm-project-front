import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectCartProductRemoved,
  selectCartProducts,
  selectCartState,
} from '../../../modules/cart/application/cart.selectors';
import { CardCreatorService } from '../../../modules/core/helpers/card-creator.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  buyCart,
  getCart,
  removeProductFromCartInStore,
  removeProductFromCartResponse,
} from '../../../modules/cart/application/cart.actions';
import { InputComponent } from '../input/input.component';
import { PurchaseTransaction } from '../../../modules/cart/domain/models/purchase.model';
import { Subject, combineLatest, skip, takeUntil, take } from 'rxjs';
import { selectCurrentUser } from '../../../modules/user/application/user.selectors';
import { removeProductFromCart } from '../../../modules/cart/application/cart.actions';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
  imports: [CommonModule, InputComponent],
})
export class CartDialogComponent implements OnDestroy {
  products: any[] = [];
  totalToPay = 0;
  step: number = 1;
  inputAddress = '';
  inputPhone = '';
  inputShipment = false;
  inputPaymentMethod = '';
  message = '';
  messageBody = '';
  private destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private cardCreatorService: CardCreatorService,
    private dialogRef: MatDialogRef<CartDialogComponent>,
    private toastService: ToastService
  ) {
    this.store.select(selectCartProducts).subscribe((products) => {
      const response = { data: null };
      this.store.dispatch(removeProductFromCartResponse({ response }));
      this.totalToPay = 0;
      this.products = [];
      if (products && products.length > 0) {
        this.products = products.map((product) => {
          this.totalToPay += product.price;
          return {
            id: product.id,
            brand: product.brand,
            tech: product.tech,
            type: product.type,
            price: product.price,
            voltage: product.voltage,
            description: product.description,
            image: this.getImage(product.image),
            usageTime:
              this.cardCreatorService.getYearsAndMonthsTransformedIntoText(
                product.registerDate
              ),
          };
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getImage(image: string): string {
    return `../../../assets/images/pics/${image}`;
  }

  onCloseModal() {
    if (this.step === 3) {
      this.ngOnDestroy();
      window.location.href = '';
    }
    this.dialogRef.close();
  }

  onDeleteClick(productId: number) {
    this.store
      .select(selectCartState)
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        this.store.dispatch(
          removeProductFromCart({ cartId: cart.id!, productId })
        );
      });
    this.store
      .select(selectCartProductRemoved)
      .pipe(skip(1), take(1))
      .subscribe((removed) => {
        console.log(removed);
        if (removed) {
          this.toastService.show(
            '❗ Se ha eliminado un elemento de tu carrito'
          );
          this.store.dispatch(removeProductFromCartInStore({ productId }));
        } else if (removed === false) {
          this.toastService.show('⛔ Error al eliminar el producto');
        }
      });

    if (this.products && this.products.length < 1) {
      this.onCloseModal();
    }
  }

  onBuyCart() {
    if (this.step === 1) {
      this.step = 2;
    } else if (this.step === 2) {
      let paymentValid = false;
      let inputsValid = false;
      if (this.inputPaymentMethod !== '') {
        paymentValid = true;
        if (this.inputShipment) {
          if (this.inputAddress === '' || this.inputPhone === '') {
            this.message = 'completa todos los campos';
            inputsValid = false;
          } else {
            inputsValid = true;
          }
        } else {
          inputsValid = true;
        }
      } else {
        this.message = 'selecciona el método de pago 🏹';
        paymentValid = false;
      }
      if (inputsValid && paymentValid) {
        this.buyCart();
      }
    }
  }

  buyCart() {
    combineLatest([
      this.store.select(selectCartState),
      this.store.select(selectCurrentUser),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([cart, user]) => {
        if (this.step === 3) {
          if (cart.paid === true) {
            this.message =
              '✅ Tu compra ha sido reservada con la referencia: ' +
              cart.purchaseReference;
            this.messageBody =
              'El producto seguirá siendo visto por cualquier otro usuario hasta que realices el pago de tu compra';
          } else if (cart.paid === false) {
            this.message =
              '❌ No pudimos reservar tu compra. Inténtalo más tarde.';
            this.messageBody = '';
          }
        } else {
          if (cart && cart.id && user) {
            const purchaseTransaction: PurchaseTransaction = {
              cartId: cart.id!,
              totalToPay: this.totalToPay,
              paymentMethod: this.inputPaymentMethod,
              address: this.inputAddress === '' ? null : this.inputAddress,
              phone: this.inputPhone === '' ? null : this.inputPhone,
              userId: user.id,
            };
            this.store.dispatch(buyCart({ purchaseTransaction }));
            this.step = 3;
          }
        }
      });
  }

  onInputPhoneRef(arg0: string) {
    this.inputPhone = arg0;
  }
  onInputAddress(arg0: string) {
    this.inputAddress = arg0;
  }
  onSelectPaymentChange(event: any) {
    this.inputPaymentMethod = event.target.value;
  }
  onRadioShipmentChange(arg0: boolean) {
    this.inputShipment = arg0;
  }
}
