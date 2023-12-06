import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCartProducts } from '../../../modules/cart/application/cart.selectors';
import { CardCreatorService } from '../../../modules/core/helpers/card-creator.service';
import { MatDialogRef } from '@angular/material/dialog';
import { removeProductFromCartInStore } from '../../../modules/cart/application/cart.actions';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
})
export class CartDialogComponent {
  products: any[] = [];
  totalToPay = 0;
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

  }
}
