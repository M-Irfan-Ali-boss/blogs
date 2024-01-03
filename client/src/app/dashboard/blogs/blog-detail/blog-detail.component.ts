import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../blogs.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent {
  loader = true;
  spinner = false;
  blogDetail: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly _blogsService: BlogsService
  ) {}

  ngOnInit(): void {
    this.blogDetail = this.route.snapshot.data['blogDetail'];
    this.loader = false;
  }

  formatDate(dateString: string): string {
    return moment(dateString).format('MMM DD, YYYY');
  }

  deleteBlog(blogId: string): void {
    this.spinner = true;
    this._blogsService.deleteBlog(blogId).subscribe(() => {
      this.spinner = false;
      this.router.navigate(['/dashboard/blogs']);
    });
  }
}
