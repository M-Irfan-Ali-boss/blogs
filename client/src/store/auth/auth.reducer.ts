import { createReducer, on } from '@ngrx/store';
import * as AuthAction from './auth.action';

export interface AuthState {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  token: string | null;
  isLogin: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isLogin: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthAction.loginActionSuccess, (state, { user, token }) => ({
    ...state,
    user,
    isLogin: true,
    token,
  })),
  on(AuthAction.loginActionError, (state, { error }) => ({
    ...state,
    isLogin: false,
    error,
  })),
  on(AuthAction.registerActionSuccess, (state, { user, token }) => ({
    ...state,
    user,
    isLogin: true,
    token,
  })),
  on(AuthAction.registerActionError, (state, { error }) => ({
    ...state,
    isLogin: false,
    error,
  })),
  on(AuthAction.logoutAction, (state) => ({
    ...state,
    user: null,
    isLogin: false,
    token: null,
  }))
);
