import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '@app/dashboard/categories/categories.service';
import { Observable } from 'rxjs';
import { BlogsService } from '../blogs.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-update.component.html',
})
export class BlogUpdateComponent implements OnInit {
  categoryList$: Observable<any[]>;
  blogForm: FormGroup;
  blog: any;
  spinner: boolean = true;
  file: File | null = null;
  filePreview: string | null = null;
  fileError: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly _categoriesService: CategoriesService,
    private readonly _blogsService: BlogsService
  ) {
    this.categoryList$ = this._categoriesService.getCategoryList();
    this.blogForm = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      status: ['active', [Validators.required]],
      category: ['', [Validators.required]],
      file: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['blogId'])
        this._blogsService.getBlogById(params['blogId']).subscribe((blog) => {
          this.blog = blog;
          this.blogForm = this._fb.group({
            title: [
              blog?.title,
              [Validators.required, Validators.minLength(5)],
            ],
            description: [blog?.description, [Validators.required]],
            status: [blog?.status, [Validators.required]],
            category: [blog?.category?._id, [Validators.required]],
          });
          this.filePreview = blog?.picture?.url;
          this.spinner = false;
        });
    });
  }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      this.fileError = null;
      this.filePreview = URL.createObjectURL(fileInput.files[0]);
    }
  }

  onFileReset(): void {
    this.file = null;
    this.fileError = null;
    this.filePreview = null;
  }

  updateBlog(): void {
    if (!this.filePreview && !this.file) this.fileError = 'File is missing';
    else {
      this.spinner = true;
      const formData = new FormData();
      formData.append('blodId', this.blog?._id);
      for (const key in this.blogForm.value) {
        formData.append(key, this.blogForm.value[key]);
      }
      if (this.file) formData.append('file', this.file);
      this._blogsService.updateBlog(formData).subscribe(() => {
        this.spinner = false;
        this.router.navigate(['/dashboard/blogs']);
      });
    }
  }
}
