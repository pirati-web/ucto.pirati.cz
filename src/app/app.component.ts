import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="callout warning"><p>Beta verze! <a routerLink="/about">Info</a></p></div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Pirate budget';
}
