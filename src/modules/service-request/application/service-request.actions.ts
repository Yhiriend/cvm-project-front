import { createAction, props } from '@ngrx/store';
import { ServiceRequest } from '../domain/models/service-request.model';

export const newServiceRequest = createAction(
  '[SERVICE] New Request',
  props<{ serviceRequest: ServiceRequest }>()
);
export const newServiceRequestResponse = createAction(
  '[SERVICE] New Request Response',
  props<{ response: any }>()
);
export const newServiceRequestResponseFail = createAction(
  '[SERVICE] New Request Response Fail',
  props<{ error: any }>()
);
