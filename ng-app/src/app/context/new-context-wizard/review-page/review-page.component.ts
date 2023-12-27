import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { LocationType } from '../location-page/location-type';
import { NewContextFormModel } from '../new-context-form.model';
import { NameFormReviewComponent } from '../name-page/name-form-review.component';
import { LocationFormReviewComponent } from '../location-page/location-form-review.component';
import { LocallyFormReviewComponent } from '../location-page/locally-form-review.component';
import { AwsFormReviewComponent } from '../location-page/aws-form-review.component';
import { AzureFormReviewComponent } from '../location-page/azure-form-review.component';
import { DomainsFormReviewComponent } from '../domains-page/domains-form-review.component';

@Component({
  selector: 'app-review-page',
  standalone: true,
  imports: [
    CommonModule,
    NameFormReviewComponent,
    LocationFormReviewComponent,
    LocallyFormReviewComponent,
    AwsFormReviewComponent,
    AzureFormReviewComponent,
    DomainsFormReviewComponent,
  ],
  template: `
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="text-xl font-medium">Review</div>
      <div class="flex max-w-[1200px] flex-auto flex-col gap-5">
        <app-name-form-review [form]="form.controls.name" />
        <app-location-form-review [form]="form.controls.location" />
        <app-locally-form-review
          *ngIf="locationFormType.value === locationType.LOCALLY"
          [form]="form.controls.location.controls.locally"
        />
        <app-aws-form-review
          *ngIf="locationFormType.value === locationType.AWS"
          [form]="form.controls.location.controls.aws"
        />
        <app-azure-form-review
          *ngIf="locationFormType.value === locationType.AZURE"
          [form]="form.controls.location.controls.azure"
        />
        <app-domains-form-review [form]="form.controls.domains" />
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button" (click)="back.emit()">Back</button>
        <button
          class="ly-button ly-button--primary"
          (click)="next.emit()"
          [attr.aria-disabled]="form.status === 'VALID' ? undefined : true"
          [attr.disabled]="form.status === 'VALID' ? undefined : true"
        >
          Complete
        </button>
        <button class="ly-button ml-auto">Cancel</button>
      </div>
    </div>
  `,
})
export class ReviewPageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  locationType = LocationType;

  @Input() form!: FormGroup<NewContextFormModel>;

  get locationFormType() {
    return this.form.controls.location.controls.type;
  }

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
