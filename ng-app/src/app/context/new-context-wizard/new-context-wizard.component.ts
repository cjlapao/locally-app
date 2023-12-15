import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NameForm,
  NewContextWizardNamePageComponent,
} from './new-context-wizard-name-page/new-context-wizard-name-page.component';
import { NewContextWizardNavigationComponent } from './new-context-wizard-navigation/new-context-wizard-navigation.component';
import { NewContextWizardLocationPageComponent } from './new-context-wizard-location-page/new-context-wizard-location-page.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
    <div class="flex flex-col bg-locally-header-background px-7 py-4">
      <div class="text-2xl font-medium">Create a new context</div>
      <div class="text-base">
        Flow the steps to create new environment context
      </div>
    </div>
    <div class="flex flex-auto gap-2 overflow-hidden">
      <div class="min-w-[250px] overflow-auto border-r border-gray-200">
        <app-new-context-wizard-navigation></app-new-context-wizard-navigation>
      </div>
      <div class="flex-auto overflow-auto">
        <app-new-context-wizard-name-page
          [nameGroup]="form.controls.name"
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

  static readonly TYPE_LOCAL = 'local';

  currentPage = 'name';

  form = new FormBuilder().group({
    name: new FormGroup<NameForm>({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
    }),
    type: new FormControl(NewContextWizardComponent.TYPE_LOCAL),
    localPath: new FormControl(''),
  });
}
