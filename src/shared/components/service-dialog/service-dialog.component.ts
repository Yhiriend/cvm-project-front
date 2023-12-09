import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  templateUrl: './service-dialog.component.html',
  styleUrl: './service-dialog.component.css',
  imports: [SharedModule, ReactiveFormsModule],
})
export class ServiceDialogComponent {
  selectedService: string | null = null;
  step: number = 1;
  msg: any;
  productDataForm: any;
  customerDataForm: any;

  constructor(
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    private fb: FormBuilder,
    private fb2: FormBuilder,
  ) {
    this.productDataForm = this.fb.group({
      productBrand: new FormControl(''),
      productTech: new FormControl(''),
      productType: new FormControl(''),
      productVoltage: new FormControl(''),
      productAditionalInfo: new FormControl(''),
    });
    this.customerDataForm = this.fb2.group({
      customerName: new FormControl(''),
      customerSurname: new FormControl(''),
      customerAddress: new FormControl(''),
      customerPhone: new FormControl(''),
    })
  }

  onNextForm() {}
  onCloseModal() {
    this.dialogRef.close();
  }
  handleCardClick(service: string): void {
    this.selectedService = service;
  }
  onContinueClick() {
    if (this.step === 1) {
      if (this.selectedService !== null) {
        console.log(this.selectedService)
        this.step = 2;
      }
    } else if (this.step === 2) {
      this.step = 3;
    }
  }
  onPrevClick() {
    this.step = 1;
  }
}
