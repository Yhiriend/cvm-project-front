import { createReducer, on } from '@ngrx/store';
import {
  addProductToCartInStore,
  addProductToCartResponse,
  buyCartResponse,
  getCartByUserIdResponse,
  getCartResponse,
  removeProductFromCartInStore,
} from './cart.actions';

export interface CartState {
  products: any[];
  id: number | null;
  total: number | null;
  productAdded: boolean | null;
  paid: boolean | null;
  error: string | null
}

export const initialCartState: CartState = {
  products: [],
  id: null,
  total: null,
  productAdded: null,
  paid: null,
  error: null
};

export const cartReducer = createReducer(
  initialCartState,
  on(addProductToCartResponse, (state, { response }) => ({
    ...state,
    productAdded: response.data,
    error: response.message ?? null
  })),
  on(getCartResponse, (state, { response }) => ({
    ...state,
    products: response.data.productList ?? null,
    id: response.data.cartId,
    paid: response.data.cartPaid,
    total: response.data.cartTotal,
  })),
  on(addProductToCartInStore, (state, { product }) => {
    const isProductExist = state.products.some(
      (existingProduct) => existingProduct.id === product.id
    );
    const updatedProducts = isProductExist
      ? state.products
      : [...state.products, product];
    return { ...state, products: updatedProducts };
  }),
  on(getCartByUserIdResponse, (state, { response }) => ({
    ...state,
    id: response.id,
    total: response.total,
    paid: response.paid,
  })),
  on(removeProductFromCartInStore, (state, { productId }) => {
    const updatedProducts = state.products.filter((p) => p.id !== productId);
    return { ...state, products: updatedProducts };
  }),
  on(buyCartResponse, (state, {response}) => ({...state, paid: response.data ?? false}))
);
