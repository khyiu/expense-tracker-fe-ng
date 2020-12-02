import { Component } from '@angular/core';

@Component({
  selector: 'gt-root',
  template: `
    <router-outlet></router-outlet>
   `
})
export class AppComponent {
  title = 'grocery-tracker-fe';
}
