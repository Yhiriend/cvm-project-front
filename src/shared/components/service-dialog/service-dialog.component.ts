import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServiceRequest } from '../../../modules/service-request/domain/models/service-request.model';
import { Store } from '@ngrx/store';
import {
  newServiceRequest,
  newServiceRequestResponse,
} from '../../../modules/service-request/application/service-request.actions';
import { selectServiceRequestState } from '../../../modules/service-request/application/service-request.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-service-dialog',
  standalone: true,
  templateUrl: './service-dialog.component.html',
  styleUrl: './service-dialog.component.css',
  imports: [SharedModule, ReactiveFormsModule],
})
export class ServiceDialogComponent implements OnDestroy {
  selectedService: string | null = null;
  step: number = 1;
  msg: any;
  productDataForm: any;
  customerDataForm: any;
  enableAditionalInfo: boolean = true;
  message: string = '';
  messageBody: string = '';
  prevButtonText: string = 'Anterior';
  private destroy$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<ServiceDialogComponent>,
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private store: Store
  ) {
    this.message = '';
    this.messageBody = '';
    this.step = 1;
    this.productDataForm = this.fb.group({
      productBrand: new FormControl('', Validators.required),
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
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    const response = { data: null };
    this.store.dispatch(newServiceRequestResponse({ response }));
  }

  onNextForm() {}
  onCloseModal() {
    this.step = 1;
    this.prevButtonText = 'Anterior';
    this.dialogRef.close();
  }
  handleCardClick(service: string): void {
    this.selectedService = service;
  }
  onContinueClick() {
    if (this.step === 1) {
      if (this.selectedService !== null) {
        if (this.selectedService === 'MANTENIMIENTO-CORRECTIVO') {
          this.enableAditionalInfo = true;
        } else {
          this.enableAditionalInfo = false;
        }
        this.step = 2;
      }
    } else if (this.step === 2) {
      if (this.productDataForm.valid) {
        this.step = 3;
      }
    } else if (this.step === 3) {
      if (this.customerDataForm.valid) {
        const serviceRequest: ServiceRequest = {
          serviceType: this.selectedService!,
          productBrand: this.productDataForm.controls['productBrand'].value,
          productTech: this.productDataForm.controls['productTech'].value,
          productType: this.productDataForm.controls['productType'].value,
          productVoltage: this.productDataForm.controls['productVoltage'].value,
          productAditionalInfo:
            this.productDataForm.controls['productAditionalInfo'].value !== ''
              ? this.productDataForm.controls['productAditionalInfo'].value
              : null,
          customerName: this.customerDataForm.controls['customerName'].value,
          customerSurname:
            this.customerDataForm.controls['customerSurname'].value,
          customerAddress:
            this.customerDataForm.controls['customerAddress'].value,
          customerPhone: this.customerDataForm.controls['customerPhone'].value,
        };
        this.store.dispatch(newServiceRequest({ serviceRequest }));
        this.step = 4;
        this.prevButtonText = 'Cerrar';
        this.store
          .select(selectServiceRequestState)
          .pipe(takeUntil(this.destroy$))
          .subscribe((serviceState) => {
            if (serviceState && serviceState.sent) {
              this.message =
                '✅ Tu solicitud será procesada con el número de referencia: ' +
                serviceState.referenceCode;
              this.messageBody =
                'Guarda el número de referencia. En caso de que quieras posponer o cancelar tu solicitud te pediremos el número de referencia.';
            } else if (serviceState && serviceState.error !== null) {
              this.message = '❌ Hubo un error al enviar tu solicitud';
              this.messageBody = 'Por favor intentalo más tarde';
            }
          });
      }
    }
  }
  onPrevClick() {
    if (this.step === 4) {
      this.onCloseModal();
    } else if (this.step > 1) {
      this.step -= 1;
    }
  }
}
