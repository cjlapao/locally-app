import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface LoadState<T> {
  loading: boolean;
  loaded?: boolean;
  value?: T;
  error?: Error | HttpErrorResponse;
}

export const loadState =
  <T>() =>
  (source$: Observable<T>): Observable<LoadState<T>> =>
    source$.pipe(
      map((value: T) => ({
        loading: false,
        loaded: true,
        value,
        error: undefined
      })),
      startWith({ loading: true }),
      catchError((error: Error) =>
        of({ loading: false, loaded: false, value: undefined, error })
      )
    );
