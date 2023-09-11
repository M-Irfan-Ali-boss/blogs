import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '@app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@app/auth/sign-up/sign-up.component';
import { LandingComponent } from '@app/landing/landing.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
