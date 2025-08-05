import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';

import { AuthService } from '../../services/api/auth.service';
import { LoginFormComponent } from './login-form.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  template: `
    <div
      class="flex w-full grow flex-col items-center justify-end bg-locally-header-background"
    >
      <div class="flex w-[80%] flex-col gap-7 pb-[40px] pt-[100px] sm:w-[60%]">
        <div class="flex flex-col gap-4">
          <img
            alt="Locally"
            src="assets/locally-logo.svg"
            width="200"
            height="34"
          />
          <div class="text-gray-500">Local development simplified</div>
        </div>
        <div class="flex flex-col items-start gap-3">
          <a
            class="ly-link text-sm"
            target="_blank"
            rel="noopener"
            href="https://github.com/cjlapao/locally-app"
            >github.com/cjlapao/locally-app</a
          >
        </div>
      </div>
    </div>
    <div
      class="flex w-[80%] grow flex-col justify-start gap-8 pb-[100px] pt-[40px] sm:w-[60%]"
    >
      @if (loaded() && loadError()) {
        @if (loadError() === 'AuthorizationError') {
          <div class="ly-alert ly-alert--error">
            You are not authorized to access this resource.
          </div>
        }

        @if (loadError() === 'TechnicalError') {
          <div class="ly-alert ly-alert--error">
            Unable to process request. Please try again later.
          </div>
        }
      }

      <app-login-form
        class="max-w-[300px]"
        [processing]="loading()"
        (submitted)="login($event)"
      />
    </div>
  `,
  host: {
    class: 'flex h-full flex-col items-center sm:min-w-[400px]'
  }
})
export class LoginPageComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  loaded = signal(false);
  loadError = signal<boolean | string>(false);
  loadSubscription!: Subscription;

  login(event: { username: string; password: string }) {
    this.loading.set(true);
    this.loadSubscription?.unsubscribe();
    this.loadSubscription = this.authService
      .login(event.username, event.password)
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.loaded.set(true);
          this.loadError.set(false);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading.set(false);
          this.loaded.set(true);
          this.loadError.set(error.message);
        }
      });
  }

  ngOnDestroy() {
    this.loadSubscription?.unsubscribe();
  }
}
