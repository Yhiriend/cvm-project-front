import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './ariconditioner.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('product');
export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);
export const selectSearching = createSelector(
  selectProductState,
  (state) => state.searching
);
export const selectProductFiltered = createSelector(selectProductState,(state) => state.filtered)
