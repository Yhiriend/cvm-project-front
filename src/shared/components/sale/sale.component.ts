import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { newReviewResquet } from '../../../modules/sale/application/sale.actions';
import { ReviewRequest } from '../../../modules/sale/domain/models/review-request.model';
import { selectRequestSent } from '../../../modules/sale/application/sale.selectors';

@Component({
  selector: 'app-sale',
  standalone: true,
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
  imports: [ReactiveFormsModule, SharedModule],
})
export class SaleComponent implements OnInit {
  saleForm;
  customerForm;
  msg: string = '';
  msgBody: string = '';
  step = 1;

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private dialogRef: MatDialogRef<SaleComponent>,
    private readonly store: Store
  ) {
    this.saleForm = this.fb.group({
      brand: new FormControl('', Validators.required),
      cooling_capacity: new FormControl(''),
      type: new FormControl(''),
      tech: new FormControl(''),
      voltage: new FormControl('', Validators.required),
      purchase_date: new FormControl('', Validators.required),
      desired_price: new FormControl('', Validators.required),
      aditional_info: new FormControl(''),
    });
    this.customerForm = this.fb2.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.store.select(selectRequestSent).subscribe((request) => {
      if (request) {
        this.msg = '✅ Tu solicitud será procesada';
        this.msgBody =
          'Cuando el técnico esté listo te notificaremos al número de teléfono que registraste';
      } else if (request === false) {
        this.msg = '❗ Ups';
        this.msgBody =
          'Parece que hubo un error. Por favor inténtalo más tarde';
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.customerForm.valid) {
      const reviewRequest: ReviewRequest = {
        productBrand: this.saleForm.controls['brand'].value!,
        productCoolingCapacity:
          this.saleForm.controls['cooling_capacity'].value !== ''
            ? this.saleForm.controls['cooling_capacity'].value
            : null,
        productType:
          this.saleForm.controls['type'].value !== ''
            ? this.saleForm.controls['type'].value
            : null,
        productTech:
          this.saleForm.controls['tech'].value !== ''
            ? this.saleForm.controls['tech'].value
            : null,
        productVoltage: Number(this.saleForm.controls['voltage'].value),
        productPurchaseDate: this.saleForm.controls['purchase_date'].value!,
        productDesiredPrice: Number(
          this.saleForm.controls['desired_price'].value
        ),
        productAditionalInfo:
          this.saleForm.controls['aditional_info'].value !== ''
            ? this.saleForm.controls['aditional_info'].value
            : null,

        customerName: this.customerForm.controls['name'].value!,
        customerSurname: this.customerForm.controls['surname'].value!,
        customerAddress: this.customerForm.controls['address'].value!,
        customerPhone: this.customerForm.controls['phone'].value!,
      };

      this.store.dispatch(newReviewResquet({ reviewRequest }));
      this.msg = '';
      this.step = 3;
    } else {
      this.msg = 'Asegurate de llenar los campos requeridos ( * )';
    }
  }

  onNextForm(event: Event) {
    event.preventDefault();
    if (this.saleForm.valid) {
      this.step = 2;
      this.msg = '';
    } else {
      this.msg = 'Asegurate de llenar los campos requeridos ( * )';
    }
  }

  onCloseModal() {
    this.dialogRef.close();
  }
}
