import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./core.reducer";

export const selectAppState = createFeatureSelector<AppState>('app');
export const selectIsLoading = createSelector(selectAppState, (state) => state.loading);