import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BlogsModule } from './blogs/blogs.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { HeaderComponent } from '@app/components/dashboard/partials/header/header.component';
import { SideBarComponent } from '@app/components/dashboard/partials/sidebar/sidebar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardHomeComponent,
  ],
  imports: [CommonModule, AppRoutingModule, BlogsModule],
})
export class DashboardModule {}
