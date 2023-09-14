import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.pipe(
    select((state) => state.auth.isLogin),
    withLatestFrom(store.pipe(select((state) => state.auth))),
    map(([isLogin, authState]) => {
      if (isLogin) return true;
      router.navigate(['/sign-in']);
      return false;
    })
  );
};
