import { createAction, props } from '@ngrx/store';
import { Airconditioner } from '../../airconditioner/domain/models/airconditioner.model';
import { PurchaseTransaction } from '../domain/models/purchase.model';

export const addProductToCart = createAction(
  '[CART] Add product',
  props<{ cartId: number; productId: number }>()
);
export const addProductToCartResponse = createAction(
  '[CART] Add product response',
  props<{ response: any }>()
);
export const addProductToCartResponseFail = createAction(
  '[CART] Add product response fail',
  props<{ error: any }>()
);
export const addProductToCartInStore = createAction(
  '[CART] Add to Store',
  props<{ product: Airconditioner }>()
);

export const getCart = createAction('[CART] Get', props<{ userId: number }>());
export const getCartResponse = createAction(
  '[CART] Get response',
  props<{ response: any }>()
);
export const getCartResponseFail = createAction(
  '[CART] Get response fail',
  props<{ error: any }>()
);
export const getCartByUserId = createAction(
  '[CART] get by user id',
  props<{ userId: number }>()
);
export const getCartByUserIdResponse = createAction(
  '[CART] get by user id Response',
  props<{ response: any }>()
);
export const getCartByUserIdFail = createAction(
  '[CART] get by user id Fail',
  props<{ error: any }>()
);
export const removeProductFromCartInStore = createAction(
  '[CART] Remove product in the store',
  props<{ productId: number }>()
);
export const buyCart = createAction(
  '[CART] buy cart',
  props<{ purchaseTransaction: PurchaseTransaction }>()
);
export const buyCartResponse = createAction(
  '[CART] buy cart Response',
  props<{ response: any }>()
);
export const buyCartFail = createAction(
  '[CART] buy cart Fail',
  props<{ error: any }>()
);
