import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewContextWizardNamePageComponent } from './new-context-wizard-name-page/new-context-wizard-name-page.component';
import { NewContextWizardNavigationComponent } from './new-context-wizard-navigation/new-context-wizard-navigation.component';
import { NewContextWizardLocationPageComponent } from './new-context-wizard-location-page/new-context-wizard-location-page.component';

@Component({
  selector: 'app-new-context-wizard',
  standalone: true,
  imports: [
    CommonModule,
    NewContextWizardNamePageComponent,
    NewContextWizardNavigationComponent,
    NewContextWizardLocationPageComponent,
  ],
  template: `
    <div class="flex flex-col px-7 py-4 bg-locally-header-background">
      <div class="text-2xl font-medium">Create a new context</div>
      <div class="text-base">
        Flow the steps to create new environment context
      </div>
    </div>
    <div class="flex-auto flex gap-2 overflow-hidden">
      <div class="border-r border-gray-200 min-w-[250px] overflow-auto">
        <app-new-context-wizard-navigation></app-new-context-wizard-navigation>
      </div>
      <div class="flex-auto overflow-auto">
        <app-new-context-wizard-name-page
          *ngIf="currentPage === 'name'"
          (next)="currentPage = 'location'"
        ></app-new-context-wizard-name-page>
        <app-new-context-wizard-location-page
          *ngIf="currentPage === 'location'"
          (next)="currentPage = 'name'"
          (back)="currentPage = 'name'"
        ></app-new-context-wizard-location-page>
      </div>
    </div>
  `,
})
export class NewContextWizardComponent {
  @HostBinding('class') class = 'flex flex-col h-full bg-locally-background';

  currentPage = 'name';
}
