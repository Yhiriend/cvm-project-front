import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartProducts } from '../../../modules/cart/application/cart.selectors';
import { CardCreatorService } from '../../../modules/core/helpers/card-creator.service';
import { MatDialogRef } from '@angular/material/dialog';
import { removeProductFromCartInStore } from '../../../modules/cart/application/cart.actions';
import { InputComponent } from '../input/input.component';

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
    if(this.step === 1){
      this.step = 2;
    }else if(this.step === 2){
      if(this.inputAddress === '' || this.inputPhone === '' || this.inputPaymentMethod === ''){
        this.message = 'completa todos los campos'
      }else{

      }
    }

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
