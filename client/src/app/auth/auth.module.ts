import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '@app/common/error/error.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@store/auth/auth.effects';

@NgModule({
  declarations: [SignInComponent, SignUpComponent, ErrorComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature(AuthEffects),
  ],
})
export class AuthModule {}
