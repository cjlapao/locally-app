import { Component, effect, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { LoginFormModel } from './login-form.model';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  template: `
    <form
      [formGroup]="form"
      class="flex grow flex-col gap-8"
      (submit)="formSubmitted()"
    >
      <div class="flex grow flex-col gap-4">
        <div class="ly-form-field grow">
          <label for="login-form-username-field">User name</label>
          <input
            id="login-form-username-field"
            class="ly-form-control"
            [attr.readonly]="processing() ? true : null"
            [class.ly-form-control--error]="
              usernameControl.invalid &&
              (usernameControl.dirty || usernameControl.touched)
            "
            formControlName="username"
          />
          @if (
            usernameControl.invalid &&
            (usernameControl.dirty || usernameControl.touched)
          ) {
            @if (usernameControl.errors?.['required']) {
              <caption class="ly-form-field__error">
                User name is required.
              </caption>
            }
          }
        </div>

        <div class="ly-form-field">
          <label for="login-form-password-field">Password</label>
          <input
            id="login-form-password-field"
            type="password"
            class="ly-form-control"
            [attr.readonly]="processing() ? true : null"
            [class.ly-form-control--error]="
              passwordControl.invalid &&
              (passwordControl.dirty || passwordControl.touched)
            "
            formControlName="password"
          />
          @if (
            passwordControl.invalid &&
            (passwordControl.dirty || passwordControl.touched)
          ) {
            @if (passwordControl.errors?.['required']) {
              <caption class="ly-form-field__error">
                Password is required.
              </caption>
            }
          }
        </div>
      </div>

      <button
        class="ly-button ly-button--primary"
        [attr.disabled]="processing() ? true : null"
        [attr.aria-disabled]="processing() ? true : null"
        type="submit"
      >
        Login
      </button>
    </form>
  `,
  host: {
    class: 'flex flex-col gap-4'
  }
})
export class LoginFormComponent {
  processing = input<boolean>(false);

  usernameControl = new FormControl<string | null>('', Validators.required);
  passwordControl = new FormControl<string | null>('', Validators.required);

  form = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl
  });

  private processingEffect = effect(() => {
    if (this.processing()) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  });

  formSubmitted() {
    if (this.form.valid) {
      this.submitted.emit({
        username: this.usernameControl.value || '',
        password: this.passwordControl.value || ''
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  submitted = output<LoginFormModel>();
}
