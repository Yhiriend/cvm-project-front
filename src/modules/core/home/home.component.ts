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
import { DialogService } from '../../../shared/components/dialog.service';

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
  dialogService = inject(DialogService);

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
  }

  onSaleCardClick() {
    this.dialogService.openSaleDialog();
  }

  onServiceCardClick() {
    this.dialogService.openServiceDialog();
  }
}
