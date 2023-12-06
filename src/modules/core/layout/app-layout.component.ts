import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { SharedModule } from '../../../shared/components/shared.module';
import { Store } from '@ngrx/store';
import { getDataFromLocalStorage } from '../../../shared/utils/data-from-local-storage';
import { getUser } from '../../user/application/user.actions';
import { getNewestProducts } from '../../airconditioner/application/airconditioner.actions';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { selectSearching } from '../../airconditioner/application/airconditioner.selectors';
import { DataService } from '../helpers/filter-state.service';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  imports: [SharedModule, SearchComponent, CommonModule, HomeComponent],
})
export default class AppLayoutComponent implements AfterViewInit, OnInit {
  isSearching = false;

  renderer = inject(Renderer2);
  store = inject(Store);
  filterState = inject(DataService)
  searchFilter = {};

  ngOnInit(): void {
    const data = getDataFromLocalStorage();
    this.store.dispatch(getUser({ token: data }));
    this.store.dispatch(getNewestProducts());
  }

  ngAfterViewInit(): void {
    //const productList = this.createProducts();
    this.store.select(selectSearching).subscribe((isSearching) => {
      if (isSearching) {
        this.isSearching = true;
      } else {
        this.isSearching = false;
      }
    });
  }

  handleSearchFilterClick(event: any) {
    //this.filterState.updateSearchFilter(event)
  }

  createProducts(): any[] {
    const products = [];

    for (let i = 1; i <= 10; i++) {
      const product = {
        brand: `Brand ${i}`,
        reference: `Reference ${i}`,
        price: this.getRandomNumber(500, 1500).toFixed(2),
        voltage: `${this.getRandomNumber(110, 240)}V`,
        tech: `Technology ${i}`,
        type: `Type ${i}`,
        state: this.getRandomNumber(3, 5),
        image: '../../../assets/images/airproduct.png',
      };

      products.push(product);
    }

    return products;
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
