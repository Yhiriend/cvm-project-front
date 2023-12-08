import { createAction, props } from '@ngrx/store';
import { ReviewRequest } from '../domain/models/review-request.model';

export const newReviewResquet = createAction(
  '[SALE] Send Review Request',
  props<{ reviewRequest: ReviewRequest }>()
);
export const newReviewResquetResponse = createAction(
  '[SALE] Send Review Request Response',
  props<{ response: any }>()
);
export const newReviewResquetResponseFail = createAction(
  '[SALE] Send Review Request Response Fail',
  props<{ error: any }>()
);
