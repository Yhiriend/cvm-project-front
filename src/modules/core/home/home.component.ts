import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { SharedModule } from '../../../shared/components/shared.module';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../airconditioner/application/airconditioner.selectors';
import { CardCreatorService } from '../helpers/card-creator.service';
import { selectCartProductAdded } from '../../cart/application/cart.selectors';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: '../helpers/card.styles.css',
  imports: [SharedModule],
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild('productContainer') productContainer: ElementRef | undefined;

  renderer = inject(Renderer2);
  store = inject(Store);
  cardCreatoService = inject(CardCreatorService);
  toastService = inject(ToastService);
  productAdded: boolean = false;
  message: string = '';
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.store.select(selectProducts).subscribe((products) => {
      if (products) {
        this.cardCreatoService.addProducts(
          products,
          this.productContainer?.nativeElement,
          this.renderer
        );
      }
    });

    this.store.select(selectCartProductAdded).subscribe((productAdded) => {
      if (productAdded) {
        this.productAdded = productAdded;
        this.message = '✅ Se ha agregado un elemento a tu carrito!';
        this.toastService.show();
        setTimeout(() => {
          this.toastService.hide();
        }, 2500);
      } else if (productAdded === false) {
        this.message = '❌ El producto ya está en el carrito';
        this.toastService.show();
        setTimeout(() => {
          this.toastService.hide();
        }, 2500);
      }
    });
  }
}
