import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NameFormModel } from './name-form.model';

@Component({
  selector: 'app-name-form',
  imports: [ReactiveFormsModule],
  template: `
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
      @if (name.invalid && (name.dirty || name.touched)) {
        @if (name.errors?.['required']) {
          <caption class="ly-form-field__error">
            Name is required.
          </caption>
        }
        @if (name.errors?.['minlength']) {
          <caption class="ly-form-field__error">
            Name must be at least 3 characters long.
          </caption>
        }
      }
      <caption>
        Human readable name for the context will be displayed across the app and
        in CLI.
      </caption>
    </div>
  `
})
export class NameFormComponent {
  @Input() form!: FormGroup<NameFormModel>;

  get name() {
    return this.form.controls.name;
  }
}
