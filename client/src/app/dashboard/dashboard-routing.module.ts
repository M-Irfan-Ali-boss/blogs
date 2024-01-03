import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogsService } from './blogs/blogs.service';
import { CategoriesComponent } from './categories/categories.component';
import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
import { BlogUpdateComponent } from './blogs/blog-update/blog-update.component';
import { DashboardService } from './dashboard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardHomeComponent,
        data: { name: 'Home' },
        resolve: {
          blogStats: DashboardService,
        },
      },
      {
        path: 'blogs',
        pathMatch: 'full',
        component: BlogsComponent,
        data: { name: 'Blogs' },
      },
      {
        path: 'blog/:blogId',
        pathMatch: 'full',
        component: BlogDetailComponent,
        data: { name: 'BlogDetail' },
        resolve: {
          blogDetail: BlogsService,
        },
      },
      {
        path: 'blogs/create',
        pathMatch: 'full',
        component: BlogCreateComponent,
        data: { name: 'BlogCreate' },
      },
      {
        path: 'blog/update/:blogId',
        pathMatch: 'full',
        component: BlogUpdateComponent,
        data: { name: 'BlogUpdate' },
      },
      {
        path: 'categories',
        pathMatch: 'full',
        component: CategoriesComponent,
        data: { name: 'Categories' },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  providers: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRouteModule {}
