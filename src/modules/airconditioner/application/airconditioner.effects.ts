import { Injectable } from '@angular/core';
import { AirconditionerApiService } from '../infrastructure/airconditioner-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './airconditioner.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../../core/application/core.actions';
import { LoadingService } from '../../core/domain/loading.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: AirconditionerApiService,
    private loadingService: LoadingService
  ) {}

  newest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getNewestProducts),
      exhaustMap(() =>
        this.productService.getNewest().pipe(
          map((response) =>
            ProductActions.getNewestProductsResponse({ response })
          ),
          catchError((error: any) =>
            of(ProductActions.getNewestProductsResponseFail({ error }))
          )
        )
      ),
    )
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      exhaustMap((action) =>
        this.productService.getProducts(action.keywords).pipe(
          map((response) => ProductActions.getProductsResponse({ response })),
          catchError((error: any) =>
            of(ProductActions.getProductsResponseFail({ error }))
          )
        )
      ),
    )
  );
}
