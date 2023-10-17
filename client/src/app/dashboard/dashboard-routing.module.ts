import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { BlogDetailComponent } from './blogs/blog-detail/blog-detail.component';
import { BlogsService } from './blogs/blogs.service';

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
