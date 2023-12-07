import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectCartProducts,
  selectCartState,
} from '../../../modules/cart/application/cart.selectors';
import { CardCreatorService } from '../../../modules/core/helpers/card-creator.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  buyCart,
  removeProductFromCartInStore,
} from '../../../modules/cart/application/cart.actions';
import { InputComponent } from '../input/input.component';
import { searching } from '../../../modules/airconditioner/application/airconditioner.actions';
import { PurchaseTransaction } from '../../../modules/cart/domain/models/purchase.model';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../modules/user/application/user.selectors';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
  imports: [CommonModule, InputComponent],
})
export class CartDialogComponent {
  products: any[] = [];
  totalToPay = 0;
  step: number = 1;
  inputAddress = '';
  inputPhone = '';
  inputShipment = false;
  inputPaymentMethod = '';
  message = '';

  constructor(
    private readonly store: Store,
    private cardCreatorService: CardCreatorService,
    private dialogRef: MatDialogRef<CartDialogComponent>
  ) {
    this.store.select(selectCartProducts).subscribe((products) => {
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

  getImage(image: string): string {
    return `../../../assets/images/pics/${image}`;
  }

  onCloseModal() {
    this.dialogRef.close();
  }

  onDeleteClick(productId: number) {
    this.store.dispatch(removeProductFromCartInStore({ productId }));
    if (this.products && this.products.length < 1) {
      this.onCloseModal();
    }
  }

  onBuyCart() {
    if (this.step === 1) {
      this.step = 2;
    } else if (this.step === 2) {
      if (this.inputShipment) {
        if (
          this.inputAddress === '' ||
          this.inputPhone === '' ||
          this.inputPaymentMethod === ''
        ) {
          this.message = 'completa todos los campos';
        } else {
          this.subscribeToBuyCart();
        }
      } else {
        if (this.inputPaymentMethod === '') {
          this.message = 'selecciona el método de pago 🏹';
        } else {
          this.subscribeToBuyCart();
        }
      }
    }
  }

  subscribeToBuyCart() {
    combineLatest([
      this.store.select(selectCartState),
      this.store.select(selectCurrentUser),
    ]).subscribe(([cart, user]) => {
      if (this.step === 3) {
        if (cart.paid) {
          this.message = '✅ Tu compra ha sido reservada.';
        } else {
          this.message =
            '❌ No pudimos reservar tu compra. Inténtalo más tarde.';
        }
      }
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
