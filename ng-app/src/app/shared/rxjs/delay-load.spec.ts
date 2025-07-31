import { TestScheduler } from 'rxjs/testing';

import { delayLoad } from './delay-load';

describe('delayLoading', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should not pass loading state if loaded state less then timeout', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input$ = cold('a b', {
        a: { loading: true },
        b: { loading: false, loaded: true, value: 'result' }
      });

      expectObservable(input$.pipe(delayLoad(1000))).toBe('-a', {
        a: { loading: false, loaded: true, value: 'result' }
      });
    });
  });

  it('should pass loading state if loaded state more than timeout', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const input$ = cold('a 2s b', {
        a: { loading: true },
        b: { loading: false, loaded: true, value: 'result' }
      });

      expectObservable(input$.pipe(delayLoad(1000))).toBe('1s a 1s b', {
        a: { loading: true },
        b: { loading: false, loaded: true, value: 'result' }
      });
    });
  });
});
