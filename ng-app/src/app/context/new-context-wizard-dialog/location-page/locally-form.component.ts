import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface LocationLocallyForm {
  path: FormControl<string>;
}

@Component({
  selector: 'app-locally-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="ly-form-field">
      <label for="new-context-wizard-location-local-path-field"
        >Files folder</label
      >
      <input
        id="new-context-wizard-location-local-path-field"
        class="ly-form-control"
        [class.ly-form-control--error]="
          path.invalid && (path.dirty || path.touched)
        "
        [formControl]="path"
      />
      @if (path.invalid && (path.dirty || path.touched)) {
        @if (path.errors?.['required']) {
          <caption class="ly-form-field__error">
            Path is required.
          </caption>
        }
      }
      <caption>
        Folder to store environment configuration files.
      </caption>
    </div>
  `
})
export class LocallyFormComponent {
  @Input() form!: FormGroup<LocationLocallyForm>;

  get path() {
    return this.form.controls.path;
  }
}
