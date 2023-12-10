import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-row p-5 bg-locally-header-background">
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
    `,
  ],
})
export class HeaderComponent {}
