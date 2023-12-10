import { Injectable } from '@angular/core';
import { AirconditionerApiService } from '../infrastructure/airconditioner-api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './airconditioner.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LoaderService } from '../../../shared/components/loader.service';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: AirconditionerApiService,
    private loaderService: LoaderService
  ) {}

  newest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getNewestProducts),
      tap(() => this.loaderService.startLoading(true)),
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
      tap(() => this.loaderService.startLoading(false))
    )
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.productService.getProducts(action.keywords).pipe(
          map((response) => ProductActions.getProductsResponse({ response })),
          catchError((error: any) =>
            of(ProductActions.getProductsResponseFail({ error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false)),
    )
  );
}
