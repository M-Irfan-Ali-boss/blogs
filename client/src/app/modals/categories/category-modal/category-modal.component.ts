import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '@app/dashboard/categories/categories.service';
import { Category } from '@app/interfaces/categoryInterface';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
})
export class CategoryModalComponent implements OnChanges {
  @Input() show!: boolean;
  @Input() category!: Category | null;
  @Output() closeModal = new EventEmitter<void>();
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _categoryService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: new FormControl(this.category ? this.category.name : '', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  private handleSubmission() {
    this._categoryService.getCategoryList().subscribe((categories) => {
      this.closeModal.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['category'] &&
      changes['category'].currentValue !== this.categoryForm.value.name
    ) {
      console.log({ changes });
      const newCategory = changes['category'].currentValue as Category;
      this.categoryForm.patchValue({
        name: newCategory ? newCategory.name : '',
      });
    }
  }

  submitCategory() {
    if (this.category) {
      this._categoryService
        .updateCategory(this.category._id, this.categoryForm.value)
        .subscribe(() => {
          this.handleSubmission();
        });
    } else {
      this._categoryService
        .addCategory(this.categoryForm.value)
        .subscribe(() => {
          this.handleSubmission();
        });
    }
  }
}
