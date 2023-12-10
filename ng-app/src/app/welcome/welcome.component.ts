import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col h-[100vh] bg-locally-background overflow-auto">
      <div
        class="grow pl-[20%] py-[35px] justify-end bg-locally-header-background flex flex-col gap-7"
      >
        <div class="flex flex-col gap-4">
          <img
            alt="Locally"
            src="assets/locally-logo.svg"
            width="200"
            height="34"
          />
          <div class="text-gray-500">Local development simplified</div>
        </div>
        <div class="flex flex-col gap-3 items-start">
          <a
            class="ly-link text-sm"
            target="_blank"
            rel="nofollow"
            href="https://github.com/cjlapao/locally-app"
            >github.com/cjlapao/locally-app</a
          >
          <div class="text-sm">0.0.1-main</div>
        </div>
      </div>
      <div class="grow-[0.55] pl-[20%] py-[35px] justify-start">
        <div class="flex flex-col gap-4 items-start">
          <button class="ly-button ly-button--primary">
            <i class="ly-icon-create"></i>Create a new Context
          </button>
          <button class="ly-button">
            <i class="ly-icon-folder"></i>Select an existing Context
          </button>
        </div>
      </div>
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
export class WelcomeComponent {}
