import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NameForm, NamePageComponent } from './name-page/name-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import {
  LocationForm,
  LocationType,
  LocationPageComponent,
} from './location-page/location-page.component';
import {
  DomainsForm,
  DomainsPageComponent,
} from './domains-page/domains-page.component';

export interface NewContextForm {
  name: FormGroup<NameForm>;
  location: FormGroup<LocationForm>;
  domains: FormGroup<DomainsForm>;
}

export enum NewContextPage {
  NAME = 'name',
  LOCATION = 'location',
  DOMAINS = 'domains',
  REVIEW = 'review',
}

@Component({
  selector: 'app-new-context-wizard',
  standalone: true,
  imports: [
    CommonModule,
    NamePageComponent,
    NavigationComponent,
    LocationPageComponent,
    DomainsPageComponent,
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
        <app-navigation [page]="currentPage"></app-navigation>
      </div>
      <div class="flex-auto overflow-auto">
        <app-name-page
          [form]="nameForm"
          *ngIf="currentPage === newContextPage.NAME"
          (next)="currentPage = newContextPage.LOCATION"
        ></app-name-page>
        <app-location-page
          *ngIf="currentPage === newContextPage.LOCATION"
          [form]="locationForm"
          (next)="currentPage = newContextPage.DOMAINS"
          (back)="currentPage = newContextPage.NAME"
        ></app-location-page>
        <app-domains-page
          *ngIf="currentPage === newContextPage.DOMAINS"
          [form]="domainsForm"
          (next)="currentPage = newContextPage.REVIEW"
          (back)="currentPage = newContextPage.LOCATION"
        ></app-domains-page>
      </div>
    </div>
  `,
})
export class NewContextWizardComponent {
  @HostBinding('class') class = 'flex flex-col h-full bg-locally-background';

  newContextPage = NewContextPage;

  currentPage = NewContextPage.NAME;

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
          validators: [Validators.required],
          nonNullable: true,
        }),
      }),
      aws: new FormGroup({
        accessKeyId: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        accessKeySecret: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        region: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        bucketName: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
      }),
      azure: new FormGroup({
        subscriptionId: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        tenantId: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        clientId: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        clientSecret: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        storageAccountName: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        resourceGroupName: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
        containerName: new FormControl<string>(
          { value: '', disabled: true },
          {
            validators: [Validators.required],
            nonNullable: true,
          },
        ),
      }),
    }),
    domains: new FormGroup<DomainsForm>({
      domainName: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      subDomainName: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
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

  get locationFormAzure() {
    return this.form.controls.location.controls.azure;
  }

  get domainsForm() {
    return this.form.controls.domains;
  }

  constructor() {
    this.form.controls.location.controls.type.valueChanges.subscribe(
      (value) => {
        switch (value) {
          case LocationType.LOCALLY:
            this.locationFormLocally.enable();
            this.locationFormAws.disable();
            this.locationFormAzure.disable();
            break;

          case LocationType.AWS:
            this.locationFormLocally.disable();
            this.locationFormAws.enable();
            this.locationFormAzure.disable();
            break;

          case LocationType.AZURE:
            this.locationFormLocally.disable();
            this.locationFormAws.disable();
            this.locationFormAzure.enable();
            break;
        }
      },
    );
  }
}
