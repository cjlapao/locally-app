import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContextsNavigationComponent } from './context-navigation/contexts-navigation.component';
import { HeaderComponent } from './header/header.component';
import { ServicesNavigationComponent } from './services-navigation/services-navigation.component';

@Component({
  selector: 'app-browser',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ContextsNavigationComponent,
    ServicesNavigationComponent
  ],
  template: `
    <app-header></app-header>
    <div class="flex grow flex-row">
      <app-contexts-navigation></app-contexts-navigation>
      <app-services-navigation></app-services-navigation>
      <router-outlet></router-outlet>
    </div>
  `
})
export class BrowserComponent {
  @HostBinding('class') class = 'flex flex-col h-[100vh] bg-locally-background';
}
