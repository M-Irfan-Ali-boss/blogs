import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-dropdown',
  templateUrl: './blog-dropdown.component.html',
})
export class BlogDropdownComponent {
  @Input() blogId!: string;
  @Input() last!: boolean;
  dropdownState: 'in' | 'out' = 'out';

  // console.log(this.last)

  toggleDropdown() {
    this.dropdownState = this.dropdownState === 'in' ? 'out' : 'in';
  }
}
