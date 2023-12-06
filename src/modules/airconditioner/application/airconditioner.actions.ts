import { createAction, props } from '@ngrx/store';

export const getNewestProducts = createAction('[PRODUCT] Get Newest');
export const getNewestProductsResponse = createAction(
  '[PRODUCT] Get Newest Response',
  props<{ response: any }>()
);
export const getNewestProductsResponseFail = createAction(
  '[PRODUCT] Get Newest Response',
  props<{ error: any }>()
);

export const getProducts = createAction(
  '[PRODUCT] GET Products',
  props<{ keywords: string }>()
);
export const getProductsResponse = createAction(
  '[PRODUCT] Get Product Response',
  props<{ response: any }>()
);
export const getProductsResponseFail = createAction(
  '[PRODUCT] GET Product Response Fail',
  props<{ error: any }>()
);
export const searching = createAction(
  '[PRODUCT] Searching',
  props<{ searching: boolean }>()
);
export const setFilteredProduct = createAction(
  '[PRODUCT] Set Filtered',
  props<{ products: any[] }>()
);
