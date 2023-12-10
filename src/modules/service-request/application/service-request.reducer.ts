import { createReducer, on } from '@ngrx/store';
import {
  newServiceRequestResponse,
  newServiceRequestResponseFail,
} from './service-request.actions';

export interface ServiceRequestState {
  sent: boolean | null;
  referenceCode: string | null;
  error: any | null;
}

export const initialServiceRequestState: ServiceRequestState = {
  sent: null,
  referenceCode: null,
  error: null,
};

export const serviceRequestReducer = createReducer(
  initialServiceRequestState,
  on(newServiceRequestResponse, (state, { response }) => ({
    ...state,
    sent: response.data,
    referenceCode: response.referenceCode ?? null,
    error: null,
  })),
  on(newServiceRequestResponseFail, (state, { error }) => ({
    ...state,
    error: error.error ? error.error : error,
  }))
);
