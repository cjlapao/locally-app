import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const { url, method } = request;

    if (url.endsWith('/GetAllContexts') && method === 'GET') {
      return ok([
        {
          Name: 'LAMP test',
          Id: '1',
          Enabled: true,
          Valid: true,
          Location: 'C:/locally/context1',
          Type: 'locally',
        },
        {
          Name: 'Minicube',
          Id: '2',
          Enabled: true,
          Valid: true,
          Location: 'C:/locally/context2',
          Type: 'locally',
        },
      ]);
    }

    return next.handle(request);

    function ok(body?: unknown) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(2000));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
