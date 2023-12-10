import { Component } from '@angular/core';
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
    <div class="flex flex-col h-[100vh] bg-locally-background">
      <app-header></app-header>
      <div class="flex flex-row grow">
        <app-contexts-navigation></app-contexts-navigation>
        <app-services-navigation></app-services-navigation>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class BrowserComponent {}
