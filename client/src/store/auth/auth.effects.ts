import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      mergeMap((action) =>
        this.authService.loginUser(action.credientials).pipe(
          map((response: AuthActions.LoginSuccessAction) => {
            this.router.navigate(['/dashboard']);
            this.toast.success('You have been login', 'Sign In');
            return AuthActions.loginActionSuccess(response);
          }),
          catchError((error) => {
            this.toast.error(error?.error?.errors, 'Sign In');
            return of(AuthActions.loginActionError({ error }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      mergeMap((action) =>
        this.authService.registerUser(action.credientials).pipe(
          map((response: AuthActions.LoginSuccessAction) => {
            this.router.navigate(['/dashboard']);
            this.toast.success('You have been login', 'Sign Up');
            return AuthActions.registerActionSuccess(response);
          }),
          catchError((error) => {
            this.toast.error(error?.error?.errors, 'Sign Up');
            return of(AuthActions.registerActionError({ error }));
          })
        )
      )
    )
  );
}
