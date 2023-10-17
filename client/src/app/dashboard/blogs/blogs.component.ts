import { Component, OnInit } from '@angular/core';
import { BlogsService } from './blogs.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  loading: boolean = true;
  blogs: any[] = [];
  constructor(private _blogService: BlogsService) {}

  ngOnInit(): void {
    this._blogService.getBlogList().subscribe((response) => {
      this.loading = false;
      this.blogs = response;
    });
  }

  formatDate(dateString: string): string {
    return moment(dateString).format('MMM DD, YYYY');
  }
}
