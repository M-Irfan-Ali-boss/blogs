import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SideBarComponent {
  @Input() sideBar?: Boolean;
  @Input() toggleSidebar!: Function;
}
