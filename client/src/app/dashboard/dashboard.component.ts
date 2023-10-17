import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '@store/auth/auth.reducer';
import { authState } from '@store/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  sideBar: boolean = false;
  auth$: Observable<AuthState>;

  constructor(private store: Store<AuthState>) {
    this.auth$ = this.store.select(authState);
  }

  toggleSidebar = () => {
    this.sideBar = !this.sideBar;
  };
}
