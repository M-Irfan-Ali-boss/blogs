import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '@app/auth/sign-in/sign-in.component';
import { SignUpComponent } from '@app/auth/sign-up/sign-up.component';
import { LandingComponent } from '@app/landing/landing.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';
import { authGuard } from '@app/auth/auth.guard';
import { dashboardGuard } from './dashboard/dashboard.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [authGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    canActivate: [dashboardGuard],
    loadChildren: () =>
      import('./dashboard/dashboard-routing.module').then(
        (m) => m.DashboardRouteModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
