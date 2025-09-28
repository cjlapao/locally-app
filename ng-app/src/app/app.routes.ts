import { inject } from '@angular/core';
import {
  CanActivateFn,
  RedirectCommand,
  Router,
  Routes
} from '@angular/router';

import { LoginPageComponent } from './containers/login-page/login-page.component';
import { SETTING_ROUTES } from './containers/settings/settings-routes';
import { SettingsComponent } from './containers/settings/settings.component';
import { ShellComponent } from './containers/shell.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthStateService } from './services/auth-state.service';

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
    component: ShellComponent,
    children: [
      {
        path: '',
        component: ProjectsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: SETTING_ROUTES
      }
    ]
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
