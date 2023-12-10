import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ServiceRequestApiService } from '../infrastructure/service-request-api.service';
import * as ServiceRequestActions from '../application/service-request.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class ServiceRequestEffects {
  constructor(
    private action$: Actions,
    private serviceRequest: ServiceRequestApiService
  ) {}

  newRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceRequestActions.newServiceRequest),
      exhaustMap((action) =>
        this.serviceRequest.sendRequest(action.serviceRequest).pipe(
          map((response) =>
            ServiceRequestActions.newServiceRequestResponse({ response })
          ),
          catchError((error: any) =>
            of(ServiceRequestActions.newServiceRequestResponseFail({ error }))
          )
        )
      )
    )
  );
}
