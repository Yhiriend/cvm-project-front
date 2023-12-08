import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sale',
  standalone: true,
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
  imports: [ReactiveFormsModule, SharedModule],
})
export class SaleComponent {
  saleForm;
  msg: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SaleComponent>
  ) {
    this.saleForm = fb.group({
      brand: new FormControl('', Validators.required),
      cooling_capacity: new FormControl(''),
      type: new FormControl(''),
      tech: new FormControl(''),
      voltage: new FormControl('', Validators.required),
      purchase_date: new FormControl('', Validators.required),
      desired_price: new FormControl('', Validators.required),
      aditional_info: new FormControl(''),
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if(this.saleForm.valid){

    }else {
      this.msg = 'Asegurate de llenar los campos requeridos ( * )'
    }
  }

  onCloseModal() {
    this.dialogRef.close();
  }
}
