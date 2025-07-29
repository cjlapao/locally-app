import { Component, HostBinding, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AwsForm } from './aws-form.model';

@Component({
  selector: 'app-aws-form',
  imports: [ReactiveFormsModule],
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
      @if (accessKeyId.invalid && (accessKeyId.dirty || accessKeyId.touched)) {
        @if (accessKeyId.errors?.['required']) {
          <caption class="ly-form-field__error">
            Access Key Id is required.
          </caption>
        }
      }
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
      @if (
        accessKeySecret.invalid &&
        (accessKeySecret.dirty || accessKeySecret.touched)
      ) {
        @if (accessKeySecret.errors?.['required']) {
          <caption class="ly-form-field__error">
            Access Key Secret is required.
          </caption>
        }
      }
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
      @if (region.invalid && (region.dirty || region.touched)) {
        @if (region.errors?.['required']) {
          <caption class="ly-form-field__error">
            Region is required.
          </caption>
        }
      }
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
      @if (bucketName.invalid && (bucketName.dirty || bucketName.touched)) {
        @if (bucketName.errors?.['required']) {
          <caption class="ly-form-field__error">
            Bucket name is required.
          </caption>
        }
      }
      <caption>
        S3 bucket name.
      </caption>
    </div>
    <div class="ly-form-field">
      <button class="ly-button"><i class="ly-icon-play"></i>Test access</button>
    </div>
  `
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
