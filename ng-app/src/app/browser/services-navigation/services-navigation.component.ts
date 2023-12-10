import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex flex-col p-6 min-w-[250px] gap-5 border-r border-gray-200 overflow-auto"
    >
      <div class="flex flex-col gap-1">
        <div class="text-xl font-medium">Localhost 1</div>
        <div class="text-sm">
          <i
            class="i-locally-drive text-locally-text relative top-[.15em] mr-1"
          ></i>
          Local context
        </div>
      </div>
      <div class="grow flex flex-col gap-1 items-stretch">
        <!-- <a class="ly-link flex flex-row items-center gap-2 font-semibold"
          ><i class="i-locally-folder"></i>Lanes
          <div class="ml-auto font-normal">4</div></a
        >
        <a class="ly-link flex flex-row items-center gap-2"
          ><i class="i-locally-folder"></i>Services
          <div class="ml-auto font-normal"></div
        ></a> -->

        <button
          class="ly-button ly-button--text !justify-start"
          aria-pressed="true"
        >
          <i class="i-locally-folder"></i>
          <div class="truncate">Lanes</div>
          <div class="ml-auto font-normal">4</div>
        </button>
        <button class="ly-button ly-button--text !justify-start">
          <i class="i-locally-folder"></i>
          <div class="truncate">Services</div>
          <div class="ml-auto font-normal"></div>
        </button>
        <button class="ly-button ly-button--text !justify-start">
          <i class="i-locally-folder"></i>
          <div class="truncate">Infrastructure</div>
          <div class="ml-auto font-normal"></div>
        </button>
        <button class="ly-button ly-button--text !justify-start">
          <i class="i-locally-folder"></i>
          <div class="truncate">Routing</div>
          <div class="ml-auto font-normal"></div>
        </button>
        <button class="ly-button ly-button--text !justify-start">
          <i class="i-locally-folder"></i>
          <div class="truncate">Vaults</div>
          <div class="ml-auto font-normal"></div>
        </button>
        <button class="mt-auto ly-button ly-button--text !justify-start">
          <i class="i-locally-settings"></i>
          <div class="truncate">Settings</div>
          <div class="ml-auto font-normal"></div>
        </button>
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
export class ServicesNavigationComponent {}
