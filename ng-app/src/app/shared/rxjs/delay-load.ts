import { map, Observable, of, switchMap, timer } from 'rxjs';

import { LoadState } from './load-state';

export const delayLoad =
  <T>(timeout: number) =>
  (source$: Observable<LoadState<T>>): Observable<LoadState<T>> =>
    source$.pipe(
      switchMap((state) => {
        if (state.loading) {
          return timer(timeout).pipe(switchMap(() => of(state)));
        } else {
          return of(state);
        }
      })
    );
