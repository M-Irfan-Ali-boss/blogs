import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() toggleSidebar!: Function;
}

// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-child',
//   template: `
//     <div>
//       <button (click)="updateParent()">Update Parent Value</button>
//     </div>
//   `,
// })
// export class ChildComponent {
//   // Input property to receive the parent's update function
//   @Input() updateParentValue!: (newValue: string) => void;

//   // Function in the child component to update the parent
//   updateParent() {
//     const newValue = 'New Value from Child';
//     this.updateParentValue(newValue); // Call the parent's function with the new value
//   }
// }
