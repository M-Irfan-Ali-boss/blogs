import { createAction, props } from '@ngrx/store';

export interface LoginSuccessAction {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

export interface LoginCrediential {
  email: string;
  password: string;
}

export interface RegisterCrediential {
  name: string;
  email: string;
  password: string;
}

export const logoutAction = createAction('Logout User');

//Login Actions
export const loginAction = createAction(
  'Login Action',
  props<{ credientials: LoginCrediential }>()
);
export const loginActionSuccess = createAction(
  'Login Action Success',
  props<LoginSuccessAction>()
);
export const loginActionError = createAction(
  'Login Action Error',
  props<{ error: any }>()
);

//Register Actions
export const registerAction = createAction(
  'Register Action',
  props<{ credientials: RegisterCrediential }>()
);
export const registerActionSuccess = createAction(
  'Register Action Success',
  props<LoginSuccessAction>()
);
export const registerActionError = createAction(
  'Register Action Error',
  props<{ error: any }>()
);
