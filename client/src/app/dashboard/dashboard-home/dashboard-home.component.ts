import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogStats } from '@app/interfaces/dashboard.interface';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {
  sideBar: boolean = false;
  blogStats: BlogStats | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.blogStats = this.route.snapshot.data['blogStats'];
  }
}
