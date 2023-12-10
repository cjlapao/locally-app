import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-context-wizard-location-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex-auto flex flex-col gap-7 px-7 py-7">
      <div class="flex-auto flex flex-col gap-7 max-w-[600px]">
        <div class="text-xl font-medium">Location</div>
        <div class="ly-form-field">
          <label for="new-context-wizard-name-field">Context name</label>
          <input
            id="new-context-wizard-name-field"
            class="ly-form-control"
            [formControl]="name"
          />
          <caption>
            Human readable name for the context will be displayed across the app
            and in CLI.
          </caption>
        </div>
      </div>
      <div class="flex gap-2 [&>*]:!min-w-[100px]">
        <button class="ly-button ly-button--primary" (click)="next.emit()">
          Next
        </button>
        <button class="ly-button" (click)="back.emit()">Back</button>
        <button class="ly-button ly-button--text">Cancel</button>
      </div>
    </div>
  `,
})
export class NewContextWizardLocationPageComponent {
  @HostBinding('class') class = 'flex flex-col h-full';

  @Input() name!: FormControl;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
