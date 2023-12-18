import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContextsNavigationComponent } from './context-navigation/contexts-navigation.component';
import { ServicesNavigationComponent } from './services-navigation/services-navigation.component';

@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ContextsNavigationComponent,
    ServicesNavigationComponent,
  ],
  template: `
    <app-header></app-header>
    <div class="flex grow flex-row">
      <app-contexts-navigation></app-contexts-navigation>
      <app-services-navigation></app-services-navigation>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class BrowserComponent {
  @HostBinding('class') class = 'flex flex-col h-[100vh] bg-locally-background';
}
