import { TestScheduler } from 'rxjs/testing';

import { loadState } from './load-state';

describe('loadState', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should emit state changes', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input$ = cold('(a|)', { a: 'Test value' });

      expectObservable(input$.pipe(loadState())).toBe('(ab|)', {
        a: { loading: true },
        b: { loading: false, loaded: true, value: 'Test value' }
      });
    });
  });

  it('should handle errors', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input$ = cold('#', undefined, new Error('Test error'));

      expectObservable(input$.pipe(loadState())).toBe('(ab|)', {
        a: { loading: true },
        b: {
          loading: false,
          loaded: false,
          value: undefined,
          error: new Error('Test error')
        }
      });
    });
  });
});
