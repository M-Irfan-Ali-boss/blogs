import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsService } from './blogs.service';
import { BlogsComponent } from './blogs.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { BlogDropdownComponent } from '@app/components/dashboard/blogs/blog-dropdown/blog-dropdown.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { LoaderComponent } from '@app/common/loader/loader.component';

@NgModule({
  declarations: [
    BlogsComponent,
    BlogDropdownComponent,
    BlogDetailComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  providers: [BlogsService],
})
export class BlogsModule {}
