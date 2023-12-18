import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { conditionalValidator } from '../../shared/conditional-validator';
import {
  NameForm,
  NewContextWizardNamePageComponent,
} from './new-context-wizard-name-page/new-context-wizard-name-page.component';
import { NewContextWizardNavigationComponent } from './new-context-wizard-navigation/new-context-wizard-navigation.component';
import {
  LocationForm,
  LocationType,
  NewContextWizardLocationPageComponent,
} from './new-context-wizard-location-page/new-context-wizard-location-page.component';

export interface NewContextForm {
  name: FormGroup<NameForm>;
  location: FormGroup<LocationForm>;
}

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
          [form]="nameForm"
          *ngIf="currentPage === 'name'"
          (next)="currentPage = 'location'"
        ></app-new-context-wizard-name-page>
        <app-new-context-wizard-location-page
          *ngIf="currentPage === 'location'"
          [form]="locationForm"
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

  form: FormGroup<NewContextForm> = new FormBuilder().group({
    name: new FormGroup<NameForm>({
      name: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
    }),
    location: new FormGroup<LocationForm>({
      type: new FormControl<string>(LocationType.LOCALLY, {
        nonNullable: true,
      }),
      locally: new FormGroup({
        path: new FormControl<string>('', {
          validators: [
            conditionalValidator(
              () =>
                this.form.controls.location.controls.type.value ===
                LocationType.LOCALLY,
              Validators.required,
            ),
          ],
          nonNullable: true,
        }),
      }),
      aws: new FormGroup({
        accessKeyId: new FormControl<string>('', {
          validators: [
            conditionalValidator(
              () =>
                this.form.controls.location.controls.type.value ===
                LocationType.AWS,
              Validators.required,
            ),
          ],
          nonNullable: true,
        }),
        accessKeySecret: new FormControl<string>('', {
          validators: [
            conditionalValidator(
              () =>
                this.form.controls.location.controls.type.value ===
                LocationType.AWS,
              Validators.required,
            ),
          ],
          nonNullable: true,
        }),
        region: new FormControl<string>('', {
          validators: [
            conditionalValidator(
              () =>
                this.form.controls.location.controls.type.value ===
                LocationType.AWS,
              Validators.required,
            ),
          ],
          nonNullable: true,
        }),
        bucketName: new FormControl<string>('', {
          validators: [
            conditionalValidator(
              () =>
                this.form.controls.location.controls.type.value ===
                LocationType.AWS,
              Validators.required,
            ),
          ],
          nonNullable: true,
        }),
      }),
    }),
  });

  get nameForm() {
    return this.form.controls.name;
  }

  get locationForm() {
    return this.form.controls.location;
  }

  get locationFormLocally() {
    return this.form.controls.location.controls.locally;
  }

  get locationFormAws() {
    return this.form.controls.location.controls.aws;
  }

  constructor() {
    this.form.controls.location.controls.type.valueChanges.subscribe(() => {
      // TODO: Workaround for updateValueAndValidity not working for FormGroup
      // https://github.com/angular/angular/issues/24003#issuecomment-1435440463
      for (const inner in this.locationFormLocally.controls) {
        this.locationFormLocally.get(inner)?.updateValueAndValidity();
      }
      for (const inner in this.locationFormAws.controls) {
        this.locationFormAws.get(inner)?.updateValueAndValidity();
      }
    });
  }
}
