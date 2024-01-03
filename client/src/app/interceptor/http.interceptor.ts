import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
import { AuthState } from '@store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { authState } from '@store/auth/auth.selector';
import { take, switchMap } from 'rxjs/operators';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  auth$: Observable<AuthState>;

  constructor(private store: Store) {
    this.auth$ = this.store.select(authState);
  }

  private baseUrl: string = environment.apiUrl; // Set your API base URL here

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return this.auth$.pipe(
      take(1),
      switchMap((authState) => {
        // If authState is null, return an observable with the original request
        if (!authState) {
          return of(next.handle(request));
        }

        // Clone the original request and add the base URL
        let apiRequest = request.clone({
          url: `${this.baseUrl}${request.url}`,
        });

        // Add Authorization header only if authState is not null
        if (authState?.token) {
          const updatedHeaders = apiRequest.headers.set(
            'Authorization',
            `Bearer ${authState.token}`
          );
          apiRequest = apiRequest.clone({ headers: updatedHeaders });
        }

        // Check if the request requires a different Content-Type
        if (request.headers.get('Content-Type') === 'multipart/form-data') {
          // Clone the original request and set custom headers
          const formDataRequest = apiRequest.clone({
            setHeaders: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Pass the modified request with custom headers to the next handler
          return next.handle(formDataRequest);
        }

        // Pass the original request with default headers to the next handler
        return next.handle(apiRequest);
      })
    );
  }
}
