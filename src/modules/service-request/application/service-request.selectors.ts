import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServiceRequestState } from './service-request.reducer';

export const selectServiceRequestState =
  createFeatureSelector<ServiceRequestState>('service');
export const selectSentServiceRequest = createSelector(
  selectServiceRequestState,
  (state) => state.sent
);
