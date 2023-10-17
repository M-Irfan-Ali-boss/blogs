import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthState } from '@store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { authState } from '@store/auth/auth.selector';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  auth$: Observable<AuthState>;
  constructor(private store: Store) {
    this.auth$ = this.store.select(authState);
  }
  private baseUrl: string = environment.apiUrl; // Set your API base URL here
  private customHeaders = {
    'Content-Type': 'application/json',
  };

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the original request and add the base URL
    const apiRequest = request.clone({
      url: `${this.baseUrl}${request.url}`,
    });

    // Clone the original request and set custom headers
    const headersRequest = apiRequest.clone({
      setHeaders: this.customHeaders,
    });

    // Pass the modified request with custom headers to the next handler
    return next.handle(headersRequest);
  }
}