import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewRequestApiService } from '../infrastructure/review-request-api.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as SaleActions from './sale.actions';
import { LoaderService } from '../../../shared/components/loader.service';

@Injectable()
export class SaleEffects {
  constructor(
    private actions$: Actions,
    private reviewRequestService: ReviewRequestApiService,
    private loaderService: LoaderService
  ) {}

  sendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.newReviewResquet),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.reviewRequestService.sendRequest(action.reviewRequest).pipe(
          map((response) => SaleActions.newReviewResquetResponse({ response })),
          catchError((error: any) =>
            of(SaleActions.newReviewResquetResponseFail({ error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false)),
    )
  );
}
