import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocallyFormComponent } from './locally-form.component';
import { AwsFormComponent } from './aws-form.component';
import { AzureFormComponent } from './azure-form.component';
import { LocationFormModel } from './location-form.model';
import { LocationType } from './location-type';

@Component({
  selector: 'app-location-page',
  standalone: true,
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
        <app-locally-form
          *ngIf="type.value === locationType.LOCALLY"
          [form]="locallyForm"
        ></app-locally-form>
        <app-aws-form
          *ngIf="type.value === locationType.AWS"
          [form]="awsForm"
        ></app-aws-form>
        <app-azure-form
          *ngIf="type.value === locationType.AZURE"
          [form]="azureForm"
        ></app-azure-form>
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button" (click)="back.emit()">Back</button>
        <button
          class="ly-button ly-button--primary"
          (click)="next.emit()"
          [attr.aria-disabled]="form.status === 'VALID' ? undefined : true"
          [attr.disabled]="form.status === 'VALID' ? undefined : true"
        >
          Next
        </button>
        <button class="ly-button ml-auto">Cancel</button>
      </div>
    </div>
  `,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LocallyFormComponent,
    AwsFormComponent,
    AzureFormComponent,
  ],
})
export class LocationPageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  locationType = LocationType;

  @Input() form!: FormGroup<LocationFormModel>;

  get type() {
    return this.form.controls.type;
  }

  get locallyForm() {
    return this.form.controls.locally;
  }

  get awsForm() {
    return this.form.controls.aws;
  }

  get azureForm() {
    return this.form.controls.azure;
  }

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
