import { inject } from '@angular/core';
import {
  CanActivateFn,
  RedirectCommand,
  Router,
  Routes
} from '@angular/router';

import { BrowserComponent } from './browser/browser.component';
import { LanesComponent } from './browser/lanes/lanes.component';
import { ConnectionErrorPageComponent } from './containers/connection-error-page.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { ShellComponent } from './containers/shell.component';
import { AuthStateService } from './services/auth-state.service';
import { WelcomeComponent } from './welcome/welcome.component';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authStateService = inject(AuthStateService);

  return authStateService.isAuthenticated()
    ? true
    : new RedirectCommand(router.parseUrl('/login'), {
        skipLocationChange: true
      });
};

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: ShellComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
  // {
  //   path: 'connection-error',
  //   component: ConnectionErrorPageComponent
  // },
  // {
  //   path: 'browser',
  //   component: BrowserComponent,
  //   children: [{ path: '', component: LanesComponent }]
  // },
  // { path: 'welcome', component: WelcomeComponent }
];
