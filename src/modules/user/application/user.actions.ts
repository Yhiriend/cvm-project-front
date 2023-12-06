import { createAction, props } from '@ngrx/store';
import { User } from '../domain/models/user.model';
import { response } from 'express';

export const login = createAction(
  '[AUTH] User Login',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[AUTH] User Login Response',
  props<{ response: any }>()
);

export const loginFailure = createAction(
  '[AUTH] User Login Response',
  props<{ error: any }>()
);

export const register = createAction(
  '[AUTH] User Register',
  props<{ user: User }>()
);
export const registerSuccess = createAction(
  '[AUTH] User Register Response',
  props<{ response: any }>()
);
export const registerFailure = createAction(
  '[AUTH] User Register Response',
  props<{ error: any }>()
);

export const logout = createAction('[AUTH] User Logout');

export const getUser = createAction(
  '[AUTH] User Get User',
  props<{ token: string }>()
);
export const getUserSuccess = createAction(
  '[AUTH] User Get User Response',
  props<{ response: any }>()
);
export const getUserFailure = createAction(
  '[AUTH] User Get User Failure',
  props<{ error: any }>()
);
