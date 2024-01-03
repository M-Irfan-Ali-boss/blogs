import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { authState } from '@store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() toggleSidebar!: Function;
  auth$: Observable<AuthState>;

  constructor(private store: Store<AuthState>) {
    this.auth$ = this.store.select(authState);
  }
}
