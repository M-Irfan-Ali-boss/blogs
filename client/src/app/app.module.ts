import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Module Import
import { AuthModule } from '@app/auth/auth.module';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { AppRoutingModule } from '@app/app-routing.module';

//Component Import
import { AppComponent } from '@app/app.component';
import { LandingComponent } from '@app/landing/landing.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

//Reducer Imports
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from '@store/auth/auth.reducer';

//HTTp Interceptor
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiHttpInterceptor } from './interceptor/http.interceptor';

@NgModule({
  declarations: [AppComponent, LandingComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AuthModule,
    DashboardModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { auth: authReducer },
      { metaReducers: [localStorageSyncReducer] }
    ),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    HttpClientModule,
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}
