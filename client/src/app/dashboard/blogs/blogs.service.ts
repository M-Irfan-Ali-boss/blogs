import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { authState } from '@store/auth/auth.selector';
import { Observable } from 'rxjs';

@Injectable()
export class BlogsService {
  auth$: Observable<AuthState>;
  constructor(private http: HttpClient, private store: Store) {
    this.auth$ = this.store.select(authState);
  }

  //Resolver
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const blogId = route.paramMap.get('blogId');
    let token;
    this.auth$?.subscribe((data) => {
      token = data?.token;
    });
    return this.http.get(`/blog/${blogId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getBlogList(): Observable<any> {
    let token;
    this.auth$?.subscribe((data) => {
      token = data?.token;
    });
    return this.http.get('/blog/user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
