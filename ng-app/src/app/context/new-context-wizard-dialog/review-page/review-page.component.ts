import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DomainsFormReviewComponent } from '../domains-page/domains-form-review.component';
import { AwsFormReviewComponent } from '../location-page/aws-form-review.component';
import { AzureFormReviewComponent } from '../location-page/azure-form-review.component';
import { LocallyFormReviewComponent } from '../location-page/locally-form-review.component';
import { LocationFormReviewComponent } from '../location-page/location-form-review.component';
import { LocationType } from '../location-page/location-type';
import { NameFormReviewComponent } from '../name-page/name-form-review.component';
import { NewContextFormModel } from '../new-context-form.model';

@Component({
  selector: 'app-review-page',
  imports: [
    NameFormReviewComponent,
    LocationFormReviewComponent,
    LocallyFormReviewComponent,
    AwsFormReviewComponent,
    AzureFormReviewComponent,
    DomainsFormReviewComponent
  ],
  template: `
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="text-xl font-medium">Review</div>
      <div class="flex max-w-[1200px] flex-auto flex-col gap-5">
        <app-name-form-review [form]="form.controls.name" />
        <app-location-form-review [form]="form.controls.location" />
        @if (locationFormType.value === locationType.LOCALLY) {
          <app-locally-form-review
            [form]="form.controls.location.controls.locally"
          />
        }
        @if (locationFormType.value === locationType.AWS) {
          <app-aws-form-review [form]="form.controls.location.controls.aws" />
        }
        @if (locationFormType.value === locationType.AZURE) {
          <app-azure-form-review
            [form]="form.controls.location.controls.azure"
          />
        }
        <app-domains-form-review [form]="form.controls.domains" />
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button" (click)="navigateBack.emit()">Back</button>
        <button
          class="ly-button ly-button--primary"
          (click)="navigateNext.emit()"
          [attr.aria-disabled]="form.status === 'VALID' ? undefined : true"
          [attr.disabled]="form.status === 'VALID' ? undefined : true"
        >
          Create
        </button>
        <button class="ly-button ml-auto" (click)="canceled.emit()">
          Cancel
        </button>
      </div>
    </div>
  `
})
export class ReviewPageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  locationType = LocationType;

  @Input() form!: FormGroup<NewContextFormModel>;

  get locationFormType() {
    return this.form.controls.location.controls.type;
  }

  @Output() navigateBack = new EventEmitter<void>();
  @Output() navigateNext = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
}
