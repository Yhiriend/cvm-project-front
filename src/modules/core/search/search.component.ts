import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  AfterViewInit,
  Renderer2,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../airconditioner/application/airconditioner.selectors';
import { Airconditioner } from '../../airconditioner/domain/models/airconditioner.model';
import { register } from '../../user/application/user.actions';
import { DataService } from '../helpers/filter-state.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../helpers/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { CardCreatorService } from '../helpers/card-creator.service';
import { DialogService } from '../../../shared/components/dialog.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: '../helpers/card.styles.css',
  imports: [CommonModule, FormsModule, FilterPipe],
})
export class SearchComponent implements AfterViewInit {

  @ViewChild('searchResultContainer', { static: true }) searchResultContainer:
    | ElementRef
    | undefined;
  searchUsageTimeFilter: any = '';
  searchPriceFilter: any = '';
  store = inject(Store);
  renderer = inject(Renderer2);
  dataService = inject(DataService);
  cardCreatorService = inject(CardCreatorService)
  dialog = inject(DialogService)
  productList: any[] = [];
  public page: number = 0;
  orderByPriceSelector: any = '';
  orderby: string | undefined;
  totalProducts: number = 0;

  ngAfterViewInit(): void {
    this.dataService.data$.subscribe((data) => {
      this.page = 0;
      this.searchPriceFilter = data.priceFilter;
      this.searchUsageTimeFilter = data.usageTimeFilter;
      console.log(data);
    });
    this.dataService.productFiltered$.subscribe((products) => {
      this.totalProducts = products;
    });
    this.store.select(selectProducts).subscribe((products) => {
      this.page = 0;
      if (products) {
        this.productList = products.map((product: any) => {
          return {
            id: product.id,
            brand: this.cardCreatorService.capitalizeLetter(product.brand),
            tech: this.cardCreatorService.capitalizeLetter(product.tech),
            price: product.price,
            state: Number(product.state),
            image: this.cardCreatorService.getImage(product.image),
            registerDate: product.registerDate,
            type: product.type,
            voltage: product.voltage
          };
        });
      }
    });
  }

  handleOrderByPriceChange(value: string) {
    this.page = 0;
    this.orderby = value;
  }

  getPage(arg0: number) {
    return (arg0 + 20) / 20;
  }
  getTotalPages() {
    if(this.totalProducts <= 0){
      return 1;
    }
    return Math.ceil(this.totalProducts / 20);
  }
  nextPage() {
    const total = this.getTotalPages();
    if (total >= this.page / 20 + 2) this.page += 20;
  }

  prevPage() {
    if (this.page > 0) this.page -= 20;
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
  }

  getProductState(product: any) {
    return this.cardCreatorService.getState(Number(product.state));
  }

  onCardClick(product: any) {
    this.dialog.openProductDialog(product)
    }
}
