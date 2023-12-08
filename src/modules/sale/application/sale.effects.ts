import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewRequestApiService } from '../infrastructure/review-request-api.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as SaleActions from './sale.actions';

@Injectable()
export class SaleEffects {
  constructor(
    private actions$: Actions,
    private reviewRequestService: ReviewRequestApiService
  ) {}

  sendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.newReviewResquet),
      exhaustMap((action) =>
        this.reviewRequestService.sendRequest(action.reviewRequest).pipe(
          map((response) => SaleActions.newReviewResquetResponse({ response })),
          catchError((error: any) =>
            of(SaleActions.newReviewResquetResponseFail({ error }))
          )
        )
      )
    )
  );
}
