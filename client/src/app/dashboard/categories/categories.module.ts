import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { CategoriesService } from './categories.service';
import { LoaderModule } from '@app/common/loader/loader.module';
import { CategoryModalComponent } from '@app/modals/categories/category-modal/category-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriesComponent, CategoryModalComponent],
  imports: [CommonModule, AppRoutingModule, LoaderModule, ReactiveFormsModule],
  providers: [CategoriesService],
})
export class CategoriesModule {}
