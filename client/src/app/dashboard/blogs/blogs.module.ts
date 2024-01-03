import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsService } from './blogs.service';
import { BlogsComponent } from './blogs.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { LoaderModule } from '@app/common/loader/loader.module';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogUpdateComponent } from './blog-update/blog-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from '@app/common/spinner/spinner.module';

@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailComponent,
    BlogCreateComponent,
    BlogUpdateComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LoaderModule,
    ReactiveFormsModule,
    SpinnerModule,
  ],
  providers: [BlogsService],
})
export class BlogsModule {}
