import { Component } from '@angular/core';
import * as moment from 'moment';
import { CategoriesService } from './categories.service';
import { Observable } from 'rxjs';
import { Category } from '@app/interfaces/categoryInterface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  loading: boolean = false;
  show: boolean = false;
  category: Category | null = null;
  categoryList$: Observable<any[]>;

  constructor(private _categoriesService: CategoriesService) {
    this.categoryList$ = this._categoriesService.getCategoryList();
  }

  formatDate(dateString: string): string {
    return moment(dateString).format('MMM DD, YYYY');
  }

  editCategory(category: Category): void {
    this.show = true;
    this.category = category;
  }

  deleteCategory(category: Category): void {
    this._categoriesService.deleteCategory(category?._id).subscribe(() => {
      this._categoriesService.getCategoryList();
    });
  }

  openModal(): void {
    this.show = true;
  }

  closeModal(): void {
    this.show = false;
    this.category = null;
  }
}
