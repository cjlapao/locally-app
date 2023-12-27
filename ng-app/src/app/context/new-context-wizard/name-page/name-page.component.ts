import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { NameFormComponent } from './name-form.component';
import { NameFormModel } from './name-form.model';

@Component({
  selector: 'app-name-page',
  standalone: true,
  imports: [CommonModule, NameFormComponent],
  template: `
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="text-xl font-medium">Name</div>
      <div class="flex max-w-[600px] flex-auto flex-col gap-5">
        <app-name-form [form]="form"></app-name-form>
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button" aria-disabled="true" disabled>Back</button>
        <button
          class="ly-button ly-button--primary"
          (click)="next.emit()"
          [attr.aria-disabled]="form.status === 'VALID' ? undefined : true"
          [attr.disabled]="form.status === 'VALID' ? undefined : true"
        >
          Next
        </button>
        <button class="ly-button ml-auto" (click)="cancel.emit()">Cancel</button>
      </div>
    </div>
  `,
})
export class NamePageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  @Input() form!: FormGroup<NameFormModel>;

  @Output() next = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
