import { createReducer, on } from "@ngrx/store"
import { startLoading, stopLoading } from "./core.actions"

export interface AppState {
    loading: boolean
}

export const initialAppState: AppState = {
    loading: false
}

export const appReducer = createReducer(initialAppState,
    on(startLoading, (state) => ({...state, loading: true})),
    on(stopLoading, (state) => ({...state, loading: false}))
    
    )