import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserComponent } from './browser/browser.component';
import { LanesComponent } from './browser/lanes/lanes.component';

export const routes: Routes = [
  {
    path: '',
    component: BrowserComponent,
    children: [{ path: '', component: LanesComponent }],
  },
  { path: 'welcome', component: WelcomeComponent },
];
