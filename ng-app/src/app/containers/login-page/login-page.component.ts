import { Component, inject } from '@angular/core';

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
      class="flex w-[80%] grow flex-col justify-start pb-[100px] pt-[40px] sm:w-[60%]"
    >
      <app-login-form class="max-w-[300px]" (submitted)="login($event)" />
    </div>
  `,
  host: {
    class: 'flex h-full flex-col items-center sm:min-w-[400px]'
  }
})
export class LoginPageComponent {
  private authService = inject(AuthService);

  login(event: { username: string; password: string }) {
    this.authService.login(event.username, event.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
