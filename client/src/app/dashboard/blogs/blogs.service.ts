import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { authState } from '@store/auth/auth.selector';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class BlogsService {
  auth$: Observable<AuthState>;
  private blogListSubject = new BehaviorSubject<any[]>([]);
  blogList$: Observable<any[]> = this.blogListSubject.asObservable();

  constructor(private http: HttpClient, private store: Store) {
    this.auth$ = this.store.select(authState);
  }

  updatedBlogList(blogList: any[]): void {
    this.blogListSubject.next(blogList);
  }

  //Resolver
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const blogId = route.paramMap.get('blogId');
    return this.http.get(`/blog/${blogId}`);
  }

  getBlogList(): Observable<any> {
    this.http.get('/blog/user').subscribe((response: any) => {
      this.updatedBlogList(response);
    });
    return this.blogList$;
  }

  //Create a new blog
  createBlog(blog: FormData): Observable<any> {
    return this.http.post('/blog', blog);
  }

  //Update blog
  updateBlog(blog: FormData): Observable<any> {
    return this.http.put('/blog', blog);
  }

  //Get blog by id
  getBlogById(blogId: string): Observable<any> {
    return this.http.get(`/blog/${blogId}`);
  }

  //Delete a blog
  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`/blog/${blogId}`);
  }
}
