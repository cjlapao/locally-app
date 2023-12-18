import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface LocationForm {
  type: FormControl<string>;
  locally: FormGroup<{
    path: FormControl<string>;
  }>;
  aws: FormGroup<{
    accessKeyId: FormControl<string>;
    accessKeySecret: FormControl<string>;
    region: FormControl<string>;
    bucketName: FormControl<string>;
  }>;
}

export enum LocationType {
  LOCALLY = 'locally',
  AZURE = 'azure',
  AWS = 'aws',
}

@Component({
  selector: 'app-new-context-wizard-location-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="text-xl font-medium">Location</div>
      <div class="flex max-w-[600px] flex-auto flex-col gap-6">
        <div class="ly-form-field">
          <label for="new-context-wizard-location-type-field"
            >Context files location</label
          >
          <div class="flex gap-3">
            <button
              class="ly-button !gap-2 !p-4"
              [attr.aria-pressed]="
                type.value === locationType.LOCALLY ? true : undefined
              "
              (click)="type.setValue(locationType.LOCALLY)"
            >
              <i class="ly-icon-drive"></i>Locally
            </button>
            <button
              class="ly-button !gap-3 !p-4"
              [attr.aria-pressed]="
                type.value === locationType.AWS ? true : undefined
              "
              (click)="type.setValue(locationType.AWS)"
            >
              <i class="ly-icon-cloud"></i>Amazon S3
            </button>
            <button
              class="ly-button !gap-3 !p-4"
              [attr.aria-pressed]="
                type.value === locationType.AZURE ? true : undefined
              "
              (click)="type.setValue(locationType.AZURE)"
            >
              <i class="ly-icon-cloud"></i>Azure Storage
            </button>
          </div>
        </div>
        <ng-container *ngIf="type.value === locationType.LOCALLY">
          <div class="ly-form-field">
            <label for="new-context-wizard-location-local-path-field"
              >Context files folder</label
            >
            <input
              id="new-context-wizard-location-local-path-field"
              class="ly-form-control"
              [class.ly-form-control--error]="
                locallyPath.invalid &&
                (locallyPath.dirty || locallyPath.touched)
              "
              [formControl]="locallyPath"
            />
            <ng-container
              *ngIf="
                locallyPath.invalid &&
                (locallyPath.dirty || locallyPath.touched)
              "
            >
              <caption
                *ngIf="locallyPath.errors?.['required']"
                class="ly-form-field__error"
              >
                Path is required.
              </caption>
            </ng-container>
            <caption>
              Folder to store environment configuration files.
            </caption>
          </div>
        </ng-container>
        <ng-container *ngIf="type.value === locationType.AWS">
          <div class="ly-form-field">
            <label for="new-context-wizard-location-aws-access-key-id-field"
              >Access Key Id</label
            >
            <input
              id="new-context-wizard-location-local-aws-access-key-id-field"
              class="ly-form-control"
              [class.ly-form-control--error]="
                awsAccessKeyId.invalid &&
                (awsAccessKeyId.dirty || awsAccessKeyId.touched)
              "
              [formControl]="awsAccessKeyId"
            />
            <ng-container
              *ngIf="
                awsAccessKeyId.invalid &&
                (awsAccessKeyId.dirty || awsAccessKeyId.touched)
              "
            >
              <caption
                *ngIf="awsAccessKeyId.errors?.['required']"
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
                awsAccessKeySecret.invalid &&
                (awsAccessKeySecret.dirty || awsAccessKeySecret.touched)
              "
              [formControl]="awsAccessKeySecret"
            />
            <ng-container
              *ngIf="
                awsAccessKeySecret.invalid &&
                (awsAccessKeySecret.dirty || awsAccessKeySecret.touched)
              "
            >
              <caption
                *ngIf="awsAccessKeySecret.errors?.['required']"
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
            <label for="new-context-wizard-location-aws-region-field"
              >Region</label
            >
            <input
              id="new-context-wizard-location-aws-region-field"
              class="ly-form-control"
              [class.ly-form-control--error]="
                awsRegion.invalid && (awsRegion.dirty || awsRegion.touched)
              "
              [formControl]="awsRegion"
            />
            <ng-container
              *ngIf="
                awsRegion.invalid && (awsRegion.dirty || awsRegion.touched)
              "
            >
              <caption
                *ngIf="awsRegion.errors?.['required']"
                class="ly-form-field__error"
              >
                Region is required.
              </caption>
            </ng-container>
            <caption>
              Amazon
              <a class="ly-link" target="_blank" href="#"
                >resource region string</a
              >
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
                awsBucketName.invalid &&
                (awsBucketName.dirty || awsBucketName.touched)
              "
              [formControl]="awsBucketName"
            />
            <ng-container
              *ngIf="
                awsBucketName.invalid &&
                (awsBucketName.dirty || awsBucketName.touched)
              "
            >
              <caption
                *ngIf="awsBucketName.errors?.['required']"
                class="ly-form-field__error"
              >
                Bucket name is required.
              </caption>
            </ng-container>
            <caption>
              S3 bucket name
            </caption>
          </div>
          <div class="ly-form-field">
            <button class="ly-button">
              <i class="ly-icon-play"></i>Validate access
            </button>
          </div>
        </ng-container>
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button" (click)="back.emit()">Back</button>
        <button
          class="ly-button ly-button--primary"
          (click)="next.emit()"
          [attr.aria-disabled]="
            (form.statusChanges | async) === 'VALID' ? undefined : true
          "
          [attr.disabled]="
            (form.statusChanges | async) === 'VALID' ? undefined : true
          "
        >
          Next
        </button>
        <button class="ly-button ml-auto">Cancel</button>
      </div>
    </div>
  `,
})
export class NewContextWizardLocationPageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  locationType = LocationType;

  @Input() form!: FormGroup<LocationForm>;

  get type() {
    return this.form.controls.type;
  }

  get locallyPath() {
    return this.form.controls.locally.controls.path;
  }

  get awsAccessKeyId() {
    return this.form.controls.aws.controls.accessKeyId;
  }

  get awsAccessKeySecret() {
    return this.form.controls.aws.controls.accessKeySecret;
  }

  get awsRegion() {
    return this.form.controls.aws.controls.region;
  }

  get awsBucketName() {
    return this.form.controls.aws.controls.bucketName;
  }

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
