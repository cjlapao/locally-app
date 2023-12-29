import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AwsForm } from './aws-form.model';

@Component({
  selector: 'app-aws-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="ly-form-field">
      <label for="new-context-wizard-location-aws-access-key-id-field"
        >Access Key Id</label
      >
      <input
        id="new-context-wizard-location-aws-aws-access-key-id-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          accessKeyId.invalid && (accessKeyId.dirty || accessKeyId.touched)
        "
        [formControl]="accessKeyId"
      />
      <ng-container
        *ngIf="
          accessKeyId.invalid && (accessKeyId.dirty || accessKeyId.touched)
        "
      >
        <caption
          *ngIf="accessKeyId.errors?.['required']"
          class="ly-form-field__error"
        >
          Access Key Id is required.
        </caption>
      </ng-container>
      <caption>
        Amazon account Access Key Id string.
      </caption>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-aws-access-key-secret-field"
        >Access Key Secret</label
      >
      <input
        id="new-context-wizard-location-aws-access-key-secret-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          accessKeySecret.invalid &&
          (accessKeySecret.dirty || accessKeySecret.touched)
        "
        [formControl]="accessKeySecret"
      />
      <ng-container
        *ngIf="
          accessKeySecret.invalid &&
          (accessKeySecret.dirty || accessKeySecret.touched)
        "
      >
        <caption
          *ngIf="accessKeySecret.errors?.['required']"
          class="ly-form-field__error"
        >
          Access Key Secret is required.
        </caption>
      </ng-container>
      <caption>
        Amazon account Access Key Secret string.
      </caption>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-aws-region-field">Region</label>
      <input
        id="new-context-wizard-location-aws-region-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          region.invalid && (region.dirty || region.touched)
        "
        [formControl]="region"
      />
      <ng-container *ngIf="region.invalid && (region.dirty || region.touched)">
        <caption
          *ngIf="region.errors?.['required']"
          class="ly-form-field__error"
        >
          Region is required.
        </caption>
      </ng-container>
      <caption>
        Amazon
        <a class="ly-link ly-link--text" target="_blank" href="#"
          >resource region string</a
        >.
      </caption>
    </div>
    <div class="ly-form-field">
      <label for="new-context-wizard-location-aws-bucket-name-field"
        >Bucket name</label
      >
      <input
        id="new-context-wizard-location-aws-bucket-name-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          bucketName.invalid && (bucketName.dirty || bucketName.touched)
        "
        [formControl]="bucketName"
      />
      <ng-container
        *ngIf="bucketName.invalid && (bucketName.dirty || bucketName.touched)"
      >
        <caption
          *ngIf="bucketName.errors?.['required']"
          class="ly-form-field__error"
        >
          Bucket name is required.
        </caption>
      </ng-container>
      <caption>
        S3 bucket name.
      </caption>
    </div>
    <div class="ly-form-field">
      <button class="ly-button"><i class="ly-icon-play"></i>Test access</button>
    </div>
  `,
})
export class AwsFormComponent {
  @HostBinding('class') class = 'contents';

  @Input() form!: FormGroup<AwsForm>;

  get accessKeyId() {
    return this.form.controls.accessKeyId;
  }

  get accessKeySecret() {
    return this.form.controls.accessKeySecret;
  }

  get region() {
    return this.form.controls.region;
  }

  get bucketName() {
    return this.form.controls.bucketName;
  }
}
