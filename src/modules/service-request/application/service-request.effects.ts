import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ServiceRequestApiService } from '../infrastructure/service-request-api.service';
import * as ServiceRequestActions from '../application/service-request.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LoaderService } from '../../../shared/components/loader.service';

@Injectable()
export class ServiceRequestEffects {
  constructor(
    private action$: Actions,
    private serviceRequest: ServiceRequestApiService,
    private loaderService: LoaderService
  ) {}

  newRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(ServiceRequestActions.newServiceRequest),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.serviceRequest.sendRequest(action.serviceRequest).pipe(
          map((response) =>
            ServiceRequestActions.newServiceRequestResponse({ response })
          ),
          catchError((error: any) =>
            of(ServiceRequestActions.newServiceRequestResponseFail({ error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false)),
    )
  );
}
