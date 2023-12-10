import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contexts-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col px-3 py-5 gap-2 border-r border-gray-200">
      <button
        class="ly-button ly-button--text flex-col"
        title="Localhost 1"
        aria-pressed="true"
      >
        <i class="i-locally-drive"></i>
        <div class="truncate w-[48px]">Localhost 1</div>
      </button>
      <button class="ly-button ly-button--text flex-col" title="AWS">
        <i class="i-locally-cloud"></i>
        <div class="truncate w-[48px]">AWS</div>
      </button>
      <button
        class="ly-button ly-button--text flex-col"
        title="Create a new Context"
      ><i class="i-locally-add"></i></button>
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
