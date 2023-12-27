import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NameFormModel } from './name-form.model';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      <ng-container *ngIf="name.invalid && (name.dirty || name.touched)">
        <caption *ngIf="name.errors?.['required']" class="ly-form-field__error">
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
        Human readable name for the context will be displayed across the app and
        in CLI.
      </caption>
    </div>
  `,
})
export class NameFormComponent {
  @Input() form!: FormGroup<NameFormModel>;

  get name() {
    return this.form.controls.name;
  }
}
