import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SaleState } from './sale.reducer';

export const selectSaleState = createFeatureSelector<SaleState>('sale');
export const selectRequestSent = createSelector(
  selectSaleState,
  (state) => state.reviewRequestSent
);
