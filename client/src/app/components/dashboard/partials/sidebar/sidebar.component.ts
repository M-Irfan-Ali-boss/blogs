import { Component, Input } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SideBarComponent {
  @Input() sideBar?: Boolean;
  @Input() toggleSidebar!: Function;
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logoutUser();
  }
}
