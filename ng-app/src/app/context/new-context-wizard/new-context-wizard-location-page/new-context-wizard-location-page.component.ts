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
    <div class="flex flex-auto flex-col gap-7 px-7 py-7">
      <div class="flex max-w-[600px] flex-auto flex-col gap-7">
        <div class="text-xl font-medium">Location</div>
        <div class="ly-form-field">
          <label for="new-context-wizard-location-type-field"
            >Context files location</label
          >
          <div class="flex gap-3">
            <button [ariaPressed]="true" class="ly-button !gap-2 !p-4">
              <i class="ly-icon-drive"></i>Locally
            </button>
            <button class="ly-button !gap-3 !p-4">
              <i class="ly-icon-cloud"></i>Amazon S3
            </button>
            <button class="ly-button !gap-3 !p-4">
              <i class="ly-icon-cloud"></i>Azure Storage
            </button>
          </div>
        </div>
        <div class="ly-form-field">
          <label for="new-context-wizard-location-local-path-field"
            >Context files folder</label
          >
          <input
            id="new-context-wizard-location-local-path-field"
            class="ly-form-control"
            [formControl]="localPath"
          />
          <caption>
            Folder to store environment configuration files.
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

  @Input() type!: FormControl;
  @Input() localPath!: FormControl;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
}
