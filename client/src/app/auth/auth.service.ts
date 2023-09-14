import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutAction } from '@store/auth/auth.action';
import { AuthState } from '@store/auth/auth.reducer';
import { authState } from '@store/auth/auth.selector';
import { Observable } from 'rxjs';

export interface User {
  user: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  auth$: Observable<AuthState>;
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {
    this.auth$ = this.store.select(authState);
  }

  loginUser(data: { email: string; password: string }): Observable<User | any> {
    return this.http.post('/auth/login', data);
  }

  registerUser(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<User | any> {
    return this.http.post('/auth/register', data);
  }

  logoutUser() {
    this.store.dispatch(logoutAction());
    this.router.navigate(['/']);
  }
}
