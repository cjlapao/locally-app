import { signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { LoadState, loadState } from '../rxjs/load-state';

class HttpAction<T> {
  success!: (result: T) => void;
  error!: (error: any) => void;

  loading = signal(false);
  loaded = signal(false);
  loadError = signal<boolean | string>(false);
  subscription!: Subscription;

  run(action: Observable<T>) {
    this.loading.set(true);
    this.subscription?.unsubscribe();
    this.subscription = action.subscribe({
      next: (result: T) => {
        this.loading.set(false);
        this.loaded.set(true);
        this.loadError.set(false);
        if (this.success) {
          this.success(result);
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.loaded.set(true);
        this.loadError.set(error.message);
        if (this.error) {
          this.error(error);
        }
      }
    });
  }

  destroy() {
    this.subscription?.unsubscribe();
  }
}

export const httpAction = <T>({
  success,
  error
}: {
  success?: (result: T) => void;
  error?: (error: any) => void;
}) => {
  const httpActionInstance = new HttpAction<T>();
  if (success) {
    httpActionInstance.success = success;
  }
  if (error) {
    httpActionInstance.error = error;
  }
  return httpActionInstance;
};
