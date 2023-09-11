import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from '@app/landing/landing.component';
import { SignInComponent } from '@app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@app/auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { HeaderComponent } from '@components/dashboard/partials/header/header.component';
import { SideBarComponent } from '@components/dashboard/partials/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    DashboardComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
