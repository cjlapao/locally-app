import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthStateService } from '../services/auth-state.service';
import { LogoComponent } from '../shared/components/logo.component';
import { UserInfoPanelComponent } from './user-info-panel.component';

@Component({
  selector: 'app-shell',
  imports: [LogoComponent, UserInfoPanelComponent, RouterOutlet],
  template: `
    <div
      class="flex flex-row items-center justify-between bg-locally-header-background px-5 py-3"
    >
      <app-logo class="w-[150px]" />

      <button
        id="zoom-menu-toggle"
        class="ly-button ly-button--text"
        popovertarget="zoom-popover"
      >
        <app-user-info-panel /><i class="ly-icon i-locally-drop-down"></i>
      </button>

      <menu
        id="zoom-popover"
        popover
        role="menu"
        class="ly-menu !hidden [&:popover-open]:!flex"
        anchor="zoom-menu-toggle"
        style="position-area: bottom span-left"
      >
        <div class="ly-menu__item" tabindex="0">
          <i class="ly-icon i-locally-settings"></i>Settings
        </div>
        <div class="ly-menu__divider"></div>
        <div class="ly-menu__item" tabindex="0" (click)="logout()">
          <i class="ly-icon"></i>Logout
        </div>
      </menu>
    </div>

    <router-outlet />
  `
})
export class ShellComponent {
  authStateService = inject(AuthStateService);
  router = inject(Router);

  logout() {
    this.authStateService.logout();
    this.router.navigate(['/login']);
  }
}
