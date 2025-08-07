import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { delayLoad } from '../rxjs/delay-load';
import { LoadState, loadState } from '../rxjs/load-state';

@Pipe({
  name: 'loadState'
})
export class LoadStatePipe implements PipeTransform {
  transform<T>($source: Observable<T>, delay = 200): Observable<LoadState<T>> {
    return $source.pipe(loadState(), delayLoad(delay));
  }
}
