import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { delayLoad } from '../rxjs/delay-load';
import { LoadState, loadState } from '../rxjs/load-state';

@Pipe({
  name: 'loadState',
  pure: true
})
export class LoadStatePipe<T> implements PipeTransform {
  transform($source: Observable<T>, delay = 200): Observable<LoadState<T>> {
    return $source.pipe(loadState(), delayLoad(delay));
  }
}
