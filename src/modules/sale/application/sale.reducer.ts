import { createReducer, on } from '@ngrx/store';
import { ReviewRequest } from '../domain/models/review-request.model';
import { newReviewResquet, newReviewResquetResponse } from './sale.actions';

export interface SaleState {
  reviewRequest: ReviewRequest | null;
  reviewRequestSent: boolean | null;
  error: any | null;
}

export const initialSaleState: SaleState = {
  reviewRequest: null,
  reviewRequestSent: null,
  error: null,
};

export const saleReducer = createReducer(
  initialSaleState,
  on(newReviewResquetResponse, (state, { response }) => ({
    ...state,
    reviewRequestSent: response.data,
  }))
);
