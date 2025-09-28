import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings-overview',
  imports: [RouterLink],
  template: `
    <div class="flex gap-[8px] text-sm text-locally-caption-text">
      <a routerLink="/" class="ly-link">Home</a>
    </div>
    <div class="text-2xl font-medium">Settings</div>
    <div class="flex w-full flex-col">
      <div
        class="flex w-full cursor-pointer flex-row items-start gap-[16px] border-t border-locally-border px-[16px] py-[16px] hover:bg-locally-hover-background"
      >
        <div class="flex flex-col gap-[4px]">
          <div class="text-xl font-medium">
            <a class="ly-link" routerLink="/settings/users">Users</a>
          </div>
        </div>
      </div>
      <div
        class="flex w-full cursor-pointer flex-row items-start gap-[16px] border-t border-locally-border px-[16px] py-[16px] hover:bg-locally-hover-background"
      >
        <div class="flex flex-col gap-[4px]">
          <div class="text-xl font-medium">
            <a class="ly-link" routerLink="/settings/roles">Roles</a>
          </div>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'flex w-full flex-col gap-[20px]'
  }
})
export class SettingsOverviewComponent {}
