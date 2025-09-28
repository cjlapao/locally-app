import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="flex w-[200px] flex-col gap-[20px] p-[20px]">
      <div class="flex flex-col">
        <div class="text-xl font-medium">
          <a routerLink="/settings">Settings</a>
        </div>
        <div class="text-sm font-medium text-locally-caption-text"></div>
      </div>
      <div class="flex flex-col gap-[8px]">
        <div><a routerLink="/settings/users">Users</a></div>
        <div><a routerLink="/settings/roles">Roles</a></div>
      </div>
    </div>
    <div class="flex flex-1 flex-col items-center overflow-auto">
      <div
        class="flex w-full max-w-[1200px] flex-1 flex-col items-start p-[20px]"
      >
        <router-outlet class="contents"></router-outlet>
      </div>
    </div>
  `,
  host: {
    class: 'flex w-full grow flex-row'
  }
})
export class SettingsComponent {}
