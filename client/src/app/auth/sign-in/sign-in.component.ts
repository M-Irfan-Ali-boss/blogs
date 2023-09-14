import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction } from '@store/auth/auth.action';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  signInForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  async loginUser() {
    this.store.dispatch(
      loginAction({ credientials: { ...this.signInForm.value } })
    );
  }
}
