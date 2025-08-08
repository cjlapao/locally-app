import { Component } from '@angular/core';

import { LogoComponent } from '../shared/components/logo.component';
import { UserInfoPanelComponent } from './user-info-panel.component';

@Component({
  selector: 'app-shell',
  imports: [LogoComponent, UserInfoPanelComponent],
  template: `
    <div
      class="flex flex-row items-center justify-between bg-locally-header-background px-5 py-3"
    >
      <app-logo class="w-[150px]" />
      <app-user-info-panel />
    </div>
  `
})
export class ShellComponent {}
