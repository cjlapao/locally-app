import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  imports: [],
  template: `
    <div class="flex h-[100vh] flex-col overflow-auto bg-locally-background">
      <div
        class="flex grow flex-col justify-end gap-7 bg-locally-header-background py-[35px] pl-[20%]"
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
        <div class="flex flex-col items-start gap-3">
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
      <div class="grow-[0.55] justify-start py-[35px] pl-[20%]">
        <div class="flex flex-col items-start gap-4">
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
    `
  ]
})
export class WelcomeComponent {}
