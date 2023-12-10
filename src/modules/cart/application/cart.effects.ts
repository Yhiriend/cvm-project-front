import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartApiService } from '../infrastructure/cart-api.service';
import { catchError, exhaustMap, finalize, map, of, tap } from 'rxjs';
import * as CartActions from './cart.actions';
import { LoaderService } from '../../../shared/components/loader.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartService: CartApiService,
    private loaderService: LoaderService
  ) {}

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.cartService.addToCart(action.cartId, action.productId).pipe(
          map((response) => CartActions.addProductToCartResponse({ response })),
          catchError((error: any) =>
            of(CartActions.addProductToCartResponseFail({ error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCart),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.cartService.getCart(action.userId).pipe(
          map((response) => CartActions.getCartResponse({ response })),
          catchError((error: any) =>
            of(CartActions.getCartResponseFail({ error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );

  getCartByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.getCartByUserId),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.cartService.getCartByUserId(action.userId).pipe(
          map((response) => CartActions.getCartByUserIdResponse({ response })),
          catchError((error: any) =>
            of(CartActions.getCartByUserIdFail({ error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );

  buyCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.buyCart),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.cartService.buyCart(action.purchaseTransaction).pipe(
          map((response) => CartActions.buyCartResponse({ response })),
          catchError((error: any) => of(CartActions.buyCartFail({ error })))
        )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeProductFromCart),
      exhaustMap((action) =>
        this.cartService.removeProduct(action.cartId, action.productId).pipe(
          map((response) =>
            CartActions.removeProductFromCartResponse({ response })
          ),
          catchError((error: any) =>
            of(CartActions.removeProductFromCartResponseFail({ error }))
          )
        )
      )
    )
  );
}
