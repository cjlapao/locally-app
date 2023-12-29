import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AzureForm } from './azure-form.model';


@Component({
  selector: 'app-azure-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="ly-form-field">
      <label for="new-context-wizard-location-azure-subscription-id-field"
        >Subscription Id</label
      >
      <input
        id="new-context-wizard-location-azure-subscription-id-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          subscriptionId.invalid &&
          (subscriptionId.dirty || subscriptionId.touched)
        "
        [formControl]="subscriptionId"
      />
      <ng-container
        *ngIf="
          subscriptionId.invalid &&
          (subscriptionId.dirty || subscriptionId.touched)
        "
      >
        <caption
          *ngIf="subscriptionId.errors?.['required']"
          class="ly-form-field__error"
        >
          Subscription Id is required.
        </caption>
      </ng-container>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-azure-tenant-id-field"
        >Tenant Id</label
      >
      <input
        id="new-context-wizard-location-azure-tenant-id-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          tenantId.invalid && (tenantId.dirty || tenantId.touched)
        "
        [formControl]="tenantId"
      />
      <ng-container
        *ngIf="tenantId.invalid && (tenantId.dirty || tenantId.touched)"
      >
        <caption
          *ngIf="tenantId.errors?.['required']"
          class="ly-form-field__error"
        >
          Tenant Id is required.
        </caption>
      </ng-container>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-azure-client-id-field"
        >Client Id</label
      >
      <input
        id="new-context-wizard-location-azure-client-id-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          clientId.invalid && (clientId.dirty || clientId.touched)
        "
        [formControl]="clientId"
      />
      <ng-container
        *ngIf="clientId.invalid && (clientId.dirty || clientId.touched)"
      >
        <caption
          *ngIf="clientId.errors?.['required']"
          class="ly-form-field__error"
        >
          Client Id is required.
        </caption>
      </ng-container>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-azure-client-secret-field"
        >Client secret</label
      >
      <input
        id="new-context-wizard-location-azure-client-secret-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          clientSecret.invalid && (clientSecret.dirty || clientSecret.touched)
        "
        [formControl]="clientSecret"
      />
      <ng-container
        *ngIf="
          clientSecret.invalid && (clientSecret.dirty || clientSecret.touched)
        "
      >
        <caption
          *ngIf="clientSecret.errors?.['required']"
          class="ly-form-field__error"
        >
          Client secret is required.
        </caption>
      </ng-container>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-azure-storage-account-name-field"
        >Storage account name</label
      >
      <input
        id="new-context-wizard-location-azure-storage-account-name-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          storageAccountName.invalid &&
          (storageAccountName.dirty || storageAccountName.touched)
        "
        [formControl]="storageAccountName"
      />
      <ng-container
        *ngIf="
          storageAccountName.invalid &&
          (storageAccountName.dirty || storageAccountName.touched)
        "
      >
        <caption
          *ngIf="storageAccountName.errors?.['required']"
          class="ly-form-field__error"
        >
          Storage account name secret is required.
        </caption>
      </ng-container>
    </div>
    <div class="ly-form-field">
      <label
        for="new-context-wizard-location-azure-resource-account-group-field"
        >Resource group name</label
      >
      <input
        id="new-context-wizard-location-azure-resource-account-group-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          resourceGroupName.invalid &&
          (resourceGroupName.dirty || resourceGroupName.touched)
        "
        [formControl]="resourceGroupName"
      />
      <ng-container
        *ngIf="
          resourceGroupName.invalid &&
          (resourceGroupName.dirty || resourceGroupName.touched)
        "
      >
        <caption
          *ngIf="resourceGroupName.errors?.['required']"
          class="ly-form-field__error"
        >
          Resource group name secret is required.
        </caption>
      </ng-container>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-azure-container-name-field"
        >Container name</label
      >
      <input
        id="new-context-wizard-location-azure-container-name-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          containerName.invalid &&
          (containerName.dirty || containerName.touched)
        "
        [formControl]="containerName"
      />
      <ng-container
        *ngIf="
          containerName.invalid &&
          (containerName.dirty || containerName.touched)
        "
      >
        <caption
          *ngIf="containerName.errors?.['required']"
          class="ly-form-field__error"
        >
          Container name secret is required.
        </caption>
      </ng-container>
    </div>

    <div class="ly-form-field">
      <button class="ly-button"><i class="ly-icon-play"></i>Test access</button>
    </div>
  `,
})
export class AzureFormComponent {
  @HostBinding('class') class = 'contents';

  @Input() form!: FormGroup<AzureForm>;

  get subscriptionId() {
    return this.form.controls.subscriptionId;
  }

  get tenantId() {
    return this.form.controls.tenantId;
  }

  get clientId() {
    return this.form.controls.clientId;
  }

  get clientSecret() {
    return this.form.controls.clientSecret;
  }

  get storageAccountName() {
    return this.form.controls.storageAccountName;
  }

  get resourceGroupName() {
    return this.form.controls.resourceGroupName;
  }

  get containerName() {
    return this.form.controls.containerName;
  }
}
