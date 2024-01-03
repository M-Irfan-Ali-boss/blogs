import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '@app/dashboard/categories/categories.service';
import { Observable } from 'rxjs';
import { BlogsService } from '../blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
})
export class BlogCreateComponent {
  categoryList$: Observable<any[]>;
  blogForm: FormGroup;
  spinner: boolean = false;
  file: File | null = null;
  filePreview: string | null = null;
  fileError: string | null = null;

  constructor(
    private _fb: FormBuilder,
    private readonly router: Router,
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

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
      this.fileError = null;
      this.filePreview = URL.createObjectURL(fileInput.files[0]);
      this.blogForm.patchValue({ file: this.file });
    }
  }

  onFileReset(): void {
    this.file = null;
    this.fileError = null;
    this.filePreview = null;
    this.blogForm.patchValue({ file: null });
  }

  createBlog(): void {
    if (!this.file) this.fileError = 'File is missing';
    else {
      this.spinner = true;
      const formData = new FormData();
      for (const key in this.blogForm.value) {
        formData.append(key, this.blogForm.value[key]);
      }
      this._blogsService.createBlog(formData).subscribe(() => {
        this.spinner = false;
        this.router.navigate(['/dashboard/blogs']);
      });
    }
  }
}
