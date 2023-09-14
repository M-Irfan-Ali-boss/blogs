import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from '@components/dashboard/partials/sidebar/sidebar.component';
import { HeaderComponent } from '@components/dashboard/partials/header/header.component';
import { AppRoutingModule } from '@app/app-routing.module';

@NgModule({
  declarations: [DashboardComponent, SideBarComponent, HeaderComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class DashboardModule {}
