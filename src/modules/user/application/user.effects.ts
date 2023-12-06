import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthenticationApiService } from '../infrastructure/authentication-api.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authAdapter: AuthenticationApiService
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap((action) =>
        this.authAdapter.signIn(action.user).pipe(
          map((response) => UserActions.registerSuccess({ response })),
          catchError((error: any) => of(UserActions.registerFailure({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
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
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      exhaustMap((action) =>
        this.authAdapter
          .getUser(action.token)
          .pipe(
            map((response) => UserActions.getUserSuccess({ response })),
            catchError((error: any) =>
              of(UserActions.getUserFailure({ error: error }))
            )
          )
      )
    )
  );
}
