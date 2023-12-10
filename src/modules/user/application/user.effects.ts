import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthenticationApiService } from '../infrastructure/authentication-api.service';
import { LoaderService } from '../../../shared/components/loader.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authAdapter: AuthenticationApiService,
    private loaderService: LoaderService
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.authAdapter.signIn(action.user).pipe(
          map((response) => UserActions.registerSuccess({ response })),
          catchError((error: any) => of(UserActions.registerFailure({ error })))
        )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.authAdapter
          .login({
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((response) => UserActions.loginSuccess({ response })),
            catchError((error: any) =>
              of(UserActions.loginFailure({ error: error }))
            )
          )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      tap(() => this.loaderService.startLoading(true)),
      exhaustMap((action) =>
        this.authAdapter.getUser(action.token).pipe(
          map((response) => UserActions.getUserSuccess({ response })),
          catchError((error: any) =>
            of(UserActions.getUserFailure({ error: error }))
          )
        )
      ),
      tap(() => this.loaderService.startLoading(false))
    )
  );
}
