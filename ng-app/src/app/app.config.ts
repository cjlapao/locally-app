import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { fakeBackendProvider } from './fake-backend-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    fakeBackendProvider,
  ],
};
