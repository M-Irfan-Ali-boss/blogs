import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  sideBar: boolean = false;

  toggleSidebar = () => {
    this.sideBar = !this.sideBar;
  };
}
