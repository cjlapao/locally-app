import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DiscardChangesConfirmationDialogComponent } from '../../shared/discard-changes-confirmation-dialog/discard-changes-confirmation-dialog.component';
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
  selector: 'app-new-context-wizard-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DiscardChangesConfirmationDialogComponent,
    NamePageComponent,
    NavigationComponent,
    LocationPageComponent,
    DomainsPageComponent,
    ReviewPageComponent,
  ],
  template: `
    <dialog
      #wizardDialogEl
      role="presentation"
      tabindex="-1"
      class="h-full w-full rounded-xl bg-locally-background text-locally-text shadow-2xl outline-none backdrop:bg-locally-text/30"
      style="max-height: min(calc(100vh - 30px), 900px); max-width: min(calc(100vw - 30px), 1000px);"
      (click)="$event.target === wizardDialogEl && onCancel()"
      (cancel)="$event.preventDefault(); onCancel()"
    >
      <div class="flex h-full w-full flex-col bg-locally-background">
        <div class="flex flex-col bg-locally-header-background px-7 py-4">
          <div class="flex items-center">
            <div>
              <div class="text-2xl font-medium">Create a new context</div>
              <div class="text-base">
                Define the location and properties of place to store environment
                configuration files and data
              </div>
            </div>
            <button
              class="ly-button ly-button--text ml-auto"
              (click)="onCancel()"
            >
              <i class="ly-icon-close"></i>
            </button>
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
      </div>
    </dialog>
    <app-discard-changes-confirmation-dialog
      #confirmDiscardChangesDialog
      (confirm)="onConfirmDiscardChanges()"
    />
  `,
})
export class NewContextWizardDialogComponent {
  @HostBinding('class') class = 'contents';

  @ViewChild('wizardDialogEl') wizardDialogEl!: ElementRef;

  @ViewChild('confirmDiscardChangesDialog')
  confirmDiscardChangesDialog!: DiscardChangesConfirmationDialogComponent;

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

  show() {
    this.currentPage = NewContextWizardPage.NAME;
    this.form.reset();
    this.wizardDialogEl.nativeElement.showModal();
  }

  close() {
    this.wizardDialogEl.nativeElement.close();
  }

  onCancel() {
    if (this.form.dirty) {
      this.confirmDiscardChangesDialog.show();
    } else {
      this.close();
    }
  }

  onConfirmDiscardChanges() {
    this.close();
  }

  onComplete() {
    console.log('Complete!');
  }
}
