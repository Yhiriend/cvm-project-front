import { createReducer, on } from '@ngrx/store';
import { searching, setFilteredProduct } from './airconditioner.actions';
import {
  getNewestProductsResponse,
  getProductsResponse,
} from './airconditioner.actions';

export interface ProductState {
  products: any[] | null;
  filtered: any[] | null;
  searching: boolean;
}

export const initialProductState: ProductState = {
  products: null,
  filtered: null,
  searching: false,
};

export const productReducer = createReducer(
  initialProductState,
  on(getNewestProductsResponse, (state, { response }) => ({
    ...state,
    products: response.data ?? null,
    searching: false,
  })),
  on(getProductsResponse, (state, { response }) => ({
    ...state,
    products: response.data ?? null,
    searching: true,
  })),
  on(setFilteredProduct, (state, { products }) => ({
    ...state,
    filtered: products,
  }))
);
