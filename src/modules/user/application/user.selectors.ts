import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('auth');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user
);
export const selectError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectAuthToken = createSelector(
  selectUserState,
  (state) => state.token
);
