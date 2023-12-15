import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contexts-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex flex-col gap-2 border-r border-gray-200 px-3 py-5">
      <button
        class="ly-button ly-button--text flex-col"
        title="Localhost 1"
        aria-pressed="true"
      >
        <i class="i-locally-drive"></i>
        <div class="w-[48px] truncate">Localhost 1</div>
      </button>
      <button class="ly-button ly-button--text flex-col" title="AWS">
        <i class="i-locally-cloud"></i>
        <div class="w-[48px] truncate">AWS</div>
      </button>
      <button
        class="ly-button ly-button--text !justify-center"
        title="Create a new Context"
        routerLink="new"
      >
        <i class="i-locally-add"></i>
      </button>
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
export class ContextsNavigationComponent {}
