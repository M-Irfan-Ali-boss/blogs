import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { authState } from '@store/auth/auth.selector';
import { BehaviorSubject, Observable } from 'rxjs';

interface Category {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  auth$: Observable<AuthState>;
  private categoryListSubject = new BehaviorSubject<any[]>([]);
  categoryList$: Observable<any[]> = this.categoryListSubject.asObservable();

  constructor(private http: HttpClient, private store: Store) {
    this.auth$ = this.store.select(authState);
  }

  updateCategoryList(newList: any[]): void {
    this.categoryListSubject.next(newList);
  }

  getCategoryList(): Observable<any> {
    this.http.get('/category/all').subscribe((response: any) => {
      this.updateCategoryList(response);
    });

    return this.categoryList$;
  }

  addCategory(data: Category): Observable<any> {
    return this.http.post('/category', data);
  }

  updateCategory(categoryId: string, data: Category): Observable<any> {
    return this.http.put(`/category/${categoryId}`, data);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`/category/${categoryId}`);
  }
}
