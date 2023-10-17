import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent {
  blogDetail: any; // Adjust the type based on your actual blog data structure

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.blogDetail = this.route.snapshot.data['blogDetail'];
  }
}
