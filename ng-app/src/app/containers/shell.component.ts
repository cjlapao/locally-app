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
        id="user-menu-toggle"
        class="ly-button ly-button--text"
        popoverTarget="user-menu-popover"
      >
        <app-user-info-panel /><i class="ly-icon i-locally-drop-down"></i>
      </button>

      <menu
        id="user-menu-popover"
        popover="manual"
        role="menu"
        class="ly-menu !hidden [&:popover-open]:!flex"
        anchor="user-menu-toggle"
        style="position-area: bottom span-left"
      >
        <button
          class="ly-menu__item"
          tabindex="0"
          popovertarget="user-menu-popover"
          popovertargetaction="hide"
          (click)="goToSettings()"
        >
          <i class="ly-icon i-locally-settings"></i>Settings
        </button>
        <div class="ly-menu__divider"></div>
        <button
          class="ly-menu__item"
          tabindex="0"
          popovertarget="user-menu-popover"
          popovertargetaction="hide"
          (click)="logout()"
        >
          <i class="ly-icon"></i>Logout
        </button>
      </menu>
    </div>

    <router-outlet />
  `,
  host: {
    class: 'flex w-full h-full flex-col'
  }
})
export class ShellComponent {
  authStateService = inject(AuthStateService);
  router = inject(Router);

  logout() {
    this.authStateService.logout();
    this.router.navigate(['/login']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
