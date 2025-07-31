import { Component, output } from '@angular/core';
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
            [class.ly-form-control--error]="
              username.invalid && (username.dirty || username.touched)
            "
            [formControl]="username"
          />
          @if (username.invalid && (username.dirty || username.touched)) {
            @if (username.errors?.['required']) {
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
            [class.ly-form-control--error]="
              password.invalid && (password.dirty || password.touched)
            "
            [formControl]="password"
          />
          @if (password.invalid && (password.dirty || password.touched)) {
            @if (password.errors?.['required']) {
              <caption class="ly-form-field__error">
                Password is required.
              </caption>
            }
          }
        </div>
      </div>

      <button class="ly-button ly-button--primary" type="submit">Login</button>
    </form>
  `,
  host: {
    class: 'flex flex-col gap-4'
  }
})
export class LoginFormComponent {
  form = new FormGroup<LoginFormModel>({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  formSubmitted() {
    if (this.form.valid) {
      this.submitted.emit({
        username: this.username.value!,
        password: this.password.value!
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  submitted = output<{ username: string; password: string }>();
}
