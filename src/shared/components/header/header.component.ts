import {
  AfterViewInit,
  Component,
  Output,
  inject,
  EventEmitter,
} from '@angular/core';
import { SharedModule } from '../shared.module';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { selectCurrentUser } from '../../../modules/user/application/user.selectors';
import { Store } from '@ngrx/store';
import {
  getProducts,
  getProductsResponse,
} from '../../../modules/airconditioner/application/airconditioner.actions';
import {
  selectProducts,
  selectSearching,
} from '../../../modules/airconditioner/application/airconditioner.selectors';
import { Airconditioner } from '../../../modules/airconditioner/domain/models/airconditioner.model';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../modules/core/helpers/filter-state.service';
import {
  getCart,
  getCartByUserId,
} from '../../../modules/cart/application/cart.actions';
import { selectCartProducts } from '../../../modules/cart/application/cart.selectors';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [SharedModule, FormsModule, CommonModule],
})
export class HeaderComponent implements AfterViewInit {
  @Output() onSearchClickEmit = new EventEmitter<any>();
  searchTerm: string = '';
  isSearching = false;
  router = inject(Router);
  store = inject(Store);
  dataService = inject(DataService);
  dialogService = inject(DialogService);
  usageTimeSelectorFilter: number | string = '';
  priceSelectorFilter: string = '';
  userLoggedIn: any | null;
  cartSize: number = 0;

  onLoginClick() {
    this.router.navigate(['/auth/login']);
  }

  onCreateAccountClick() {
    this.router.navigate(['/auth/register']);
  }

  onApplyFiltersClick() {
    const data = {
      priceFilter: this.priceSelectorFilter,
      usageTimeFilter: this.usageTimeSelectorFilter,
    };
    this.dataService.sendData(data);
  }

  ngAfterViewInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.userLoggedIn = user;
        this.store.dispatch(getCart({ userId: this.userLoggedIn.id }));
      }
    });
    this.store.select(selectSearching).subscribe((isSearching) => {
      if (isSearching) {
        this.isSearching = true;
      } else {
        this.isSearching = false;
      }
    });
    this.store.select(selectCartProducts).subscribe((cartproducts) => {
      this.cartSize = 0;
      if (cartproducts && cartproducts.length > 0) {
        this.cartSize = cartproducts.length;
      }
    });
  }

  onSearchClick() {
    if (this.searchTerm) {
      this.store.dispatch(getProducts({ keywords: this.searchTerm }));
    }
  }

  onCartClick() {
    if (this.userLoggedIn) {
      this.dialogService.openCartDialog();
    }
  }

  onLogoutClick() {
    localStorage.clear();
    window.location.href = '';
  }
}
