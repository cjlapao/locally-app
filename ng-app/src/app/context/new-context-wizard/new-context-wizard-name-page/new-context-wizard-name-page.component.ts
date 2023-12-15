import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface NameForm {
  name: FormControl<string>;
}

@Component({
  selector: 'app-new-context-wizard-name-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="flex max-w-[600px] flex-auto flex-col gap-7">
        <div class="text-xl font-medium">Name</div>
        <div class="ly-form-field">
          <label for="new-context-wizard-name-field">Context name</label>
          <input
            id="new-context-wizard-name-field"
            class="ly-form-control"
            [class.ly-form-control--error]="
              name.invalid && (name.dirty || name.touched)
            "
            [formControl]="name"
          />
          <ng-container *ngIf="name.invalid && (name.dirty || name.touched)">
            <caption
              *ngIf="name.errors?.['required']"
              class="ly-form-field__error"
            >
              Name is required.
            </caption>
            <caption
              *ngIf="name.errors?.['minlength']"
              class="ly-form-field__error"
            >
              Name must be at least 3 characters long.
            </caption>
          </ng-container>
          <caption>
            Human readable name for the context will be displayed across the app
            and in CLI.
          </caption>
        </div>
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button
          class="ly-button ly-button--primary"
          (click)="next.emit()"
          [ariaDisabled]="nameGroup.invalid"
          [attr.disabled]="nameGroup.invalid ? true : undefined"
        >
          Next
        </button>
        <button class="ly-button" aria-disabled="true" disabled>Back</button>
        <button class="ly-button ly-button--text">Cancel</button>
      </div>
    </div>
  `,
})
export class NewContextWizardNamePageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  @Input() nameGroup!: FormGroup<NameForm>;

  get name() {
    return this.nameGroup.controls.name;
  }

  @Output() next = new EventEmitter<void>();
}
