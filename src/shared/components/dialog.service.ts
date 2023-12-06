import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Airconditioner } from '../../modules/airconditioner/domain/models/airconditioner.model';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openProductDialog(product: Airconditioner): void {
    this.dialog.open(ProductDialogComponent, {
      disableClose: true,
      width: '700px',
      minWidth: '700px',
      height: '400px',
      minHeight: '400px',
      data: { product },
    });
  }

  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {
      disableClose: true,
      width: '800px',
      minWidth: '800px',
      height: '400px',
      minHeight: '400px',
      data: {},
    });
  }
}
