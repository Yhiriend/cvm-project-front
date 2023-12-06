import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  token: string | null;
  user: any | null;
  error: any;
}

export const initialUserState: UserState = {
  token: null,
  user: null,
  error: null,
};

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.data,
    token: response.token,
    error: null,
  })),
  on(UserActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: response.data,
    token: response.token,
  })),
  on(UserActions.getUserSuccess, (state, {response}) => ({...state, user: response.data ?? null}))
);
