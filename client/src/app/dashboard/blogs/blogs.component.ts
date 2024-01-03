import { Component } from '@angular/core';
import { BlogsService } from './blogs.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  loading: boolean = true;
  blogList$: Observable<any[]>;

  constructor(private _blogService: BlogsService) {
    this.blogList$ = this._blogService.getBlogList();
    this.loading = false;
  }

  formatDate(dateString: string): string {
    return moment(dateString).format('MMM DD, YYYY');
  }
}
