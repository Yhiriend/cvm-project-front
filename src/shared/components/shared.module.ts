import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { CardServiceComponent } from './card-service/card-service.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { ToastComponent } from './toast/toast.component';



@NgModule({
  declarations: [],
  exports: [InputComponent, ButtonComponent, HeaderComponent, MatIconModule, CardServiceComponent, FooterComponent, DropdownButtonComponent, ToastComponent],
  imports: [
    CommonModule,InputComponent, ButtonComponent, HeaderComponent, MatIconModule, CardServiceComponent, FooterComponent, DropdownButtonComponent, ToastComponent
  ]
})
export class SharedModule { }
