import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartApiService } from '../infrastructure/cart-api.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as CartActions from './cart.actions';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../../core/application/core.actions';
import { LoadingService } from '../../core/domain/loading.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartApiService, private loadingService: LoadingService) {}

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      exhaustMap((action) =>
        this.cartService.addToCart(action.cartId, action.productId).pipe(
          map((response) => CartActions.addProductToCartResponse({ response })),
          catchError((error: any) =>
            of(CartActions.addProductToCartResponseFail({ error }))
          )
        )
      ),
    )
  );

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCart),
      exhaustMap((action) =>
        this.cartService.getCart(action.userId).pipe(
          map((response) => CartActions.getCartResponse({ response })),
          catchError((error: any) =>
            of(CartActions.getCartResponseFail({ error }))
          )
        )
      ),
    )
  );

  getCartByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCartByUserId),
      exhaustMap((action) =>
        this.cartService.getCartByUserId(action.userId).pipe(
          map((response) => CartActions.getCartByUserIdResponse({ response })),
          catchError((error: any) =>
            of(CartActions.getCartByUserIdFail({ error }))
          )
        )
      ),
    )
  );

  buyCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.buyCart),
      exhaustMap((action) =>
        this.cartService.buyCart(action.purchaseTransaction).pipe(
          map((response) => CartActions.buyCartResponse({ response })),
          catchError((error: any) => of(CartActions.buyCartFail({ error })))
        )
      ),
    )
  );
}
