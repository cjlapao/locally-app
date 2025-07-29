import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <div class="flex flex-row bg-locally-header-background p-5">
      <img
        alt="Locally"
        src="assets/locally-logo.svg"
        width="112"
        height="17"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `
  ]
})
export class HeaderComponent {}
