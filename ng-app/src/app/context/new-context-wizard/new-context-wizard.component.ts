import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NewContextWizardPage } from './new-context-wizard-page';
import { NewContextFormModel } from './new-context-form.model';
import { NavigationComponent } from './navigation/navigation.component';
import { NameFormModel } from './name-page/name-form.model';
import { NamePageComponent } from './name-page/name-page.component';
import { LocationType } from './location-page/location-type';
import { LocationFormModel } from './location-page/location-form.model';
import { LocationPageComponent } from './location-page/location-page.component';
import { DomainsFormModel } from './domains-page/domains-form.model';
import { DomainsPageComponent } from './domains-page/domains-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';

@Component({
  selector: 'app-new-context-wizard',
  standalone: true,
  imports: [
    CommonModule,
    NamePageComponent,
    NavigationComponent,
    LocationPageComponent,
    DomainsPageComponent,
    ReviewPageComponent,
  ],
  template: `
    <dialog
      #confirmDlg
      role="presentation"
      class="rounded-2xl border-4 border-locally-selected-background bg-white p-8 pt-6 shadow-2xl backdrop:bg-locally-header-background/50"
      (click)="$event.target === confirmDlg && confirmDlg.close()"
    >
      <div class="flex flex-col gap-5 text-locally-text">
        <div class="flex items-center">
          <div class="text-xl font-medium">Confirmation required</div>
          <button
            class="ly-button ly-button--text ml-auto"
            (click)="confirmDlg.close()"
          >
            <i class="ly-icon-close"></i>
          </button>
        </div>
        <div class="flex flex-col gap-6">
          <div>Do you really want to leave context creation wizard?</div>
          <div class="flex gap-2 [&>*]:!min-w-[100px]">
            <button
              class="ly-button ly-button--primary"
              (click)="confirmDlg.close()"
            >
              No
            </button>
            <button class="ly-button">Yes</button>
          </div>
        </div>
      </div>
    </dialog>
    <div class="flex flex-col bg-locally-header-background px-7 py-4">
      <div class="text-2xl font-medium">Create a new context</div>
      <div class="text-base">
        Define the location and properties of place to store environment
        configuration files and data
      </div>
    </div>
    <div class="flex flex-auto gap-2 overflow-hidden">
      <div class="w-[250px] overflow-auto border-r border-gray-200">
        <app-navigation
          [page]="currentPage"
          (navigate)="currentPage = $event"
        ></app-navigation>
      </div>
      <div class="flex-auto overflow-auto">
        <app-name-page
          [form]="nameForm"
          *ngIf="currentPage === newContextPage.NAME"
          (next)="currentPage = newContextPage.LOCATION"
          (cancel)="onCancel()"
        ></app-name-page>
        <app-location-page
          *ngIf="currentPage === newContextPage.LOCATION"
          [form]="locationForm"
          (next)="currentPage = newContextPage.DOMAINS"
          (back)="currentPage = newContextPage.NAME"
          (cancel)="onCancel()"
        ></app-location-page>
        <app-domains-page
          *ngIf="currentPage === newContextPage.DOMAINS"
          [form]="domainsForm"
          (next)="currentPage = newContextPage.REVIEW"
          (back)="currentPage = newContextPage.LOCATION"
          (cancel)="onCancel()"
        ></app-domains-page>
        <app-review-page
          *ngIf="currentPage === newContextPage.REVIEW"
          [form]="form"
          (next)="onComplete()"
          (back)="currentPage = newContextPage.DOMAINS"
          (cancel)="onCancel()"
        ></app-review-page>
      </div>
    </div>
  `,
})
export class NewContextWizardComponent {
  @HostBinding('class') class = 'flex flex-col h-full bg-locally-background';

  newContextPage = NewContextWizardPage;

  currentPage = NewContextWizardPage.NAME;

  form: FormGroup<NewContextFormModel> = new FormBuilder().group({
    name: new FormGroup<NameFormModel>({
      name: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
      }),
    }),
    location: new FormGroup<LocationFormModel>({
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
    domains: new FormGroup<DomainsFormModel>({
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

  @ViewChild('confirmDlg') confirmDlg!: ElementRef;

  onDialogClick(clickOnBackgdrop: boolean) {
    console.log(clickOnBackgdrop);
    if (clickOnBackgdrop) {
      this.onCancel();
    }
  }

  onCancel() {
    this.confirmDlg.nativeElement.showModal();
  }

  onComplete() {
    console.log('Complete!');
  }
}
