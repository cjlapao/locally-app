import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

function ok(body?: unknown) {
  return of(new HttpResponse({ status: 200, body })).pipe(delay(1000));
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url, method } = request;

    if (url.includes('/GetAllContexts') && method === 'GET') {
      return ok([
        {
          Id: '1',
          Name: 'LAMP test',
          Enabled: true,
          Valid: true,
          Location: 'C:/locally/context1',
          Type: 'locally'
        },
        {
          Id: '2',
          Name: 'Minicube',
          Enabled: true,
          Valid: true,
          Location: 'C:/locally/context2',
          Type: 'locally'
        }
      ]);
    }

    if (url.includes('/GetContextDetails/1') && method === 'GET') {
      return ok({
        Id: '1',
        Name: 'LAMP test',
        Enabled: true,
        Valid: true,
        Location: 'C:/locally/context1',
        Type: 'locally',
        Folders: [
          {
            Id: '1',
            Name: 'Lanes',
            Items: ['1', '2', '3']
          },
          {
            Id: '2',
            Name: 'Services',
            Items: ['4']
          },
          {
            Id: '3',
            Name: 'Infrastructure'
          },
          {
            Id: '4',
            Name: 'Routing'
          },
          {
            Id: '5',
            Name: 'Vaults'
          }
        ],
        Items: [
          {
            Id: '1',
            Type: 'lane',
            Name: 'Deploy SQL Server',
            Status: 'completed',
            Actions: [
              {
                Id: 'run',
                Enabled: true
              }
            ]
          },
          {
            Id: '2',
            Type: 'docker',
            Name: 'PHP My Admin',
            Status: 'failed',
            StatusMessage: 'Error description',
            Actions: [
              {
                Id: 'run',
                Enabled: true
              }
            ]
          },
          {
            Id: '3',
            Type: 'docker',
            Name: 'Test lane',
            Status: 'running',
            StatusMessage: 'Starting docker',
            Actions: [
              {
                Id: 'run',
                Enabled: false
              },
              {
                Id: 'pause',
                Enabled: true
              },
              {
                Id: 'stop',
                Enabled: true
              }
            ]
          },
          {
            Id: '4',
            Type: 'routing',
            Name: 'Route to something',
            Status: 'warning',
            StatusMessage: 'Some message about warning',
            Actions: [
              {
                Id: 'run',
                Enabled: true
              },
              {
                Id: 'pause',
                Enabled: false
              },
              {
                Id: 'stop',
                Enabled: false
              }
            ]
          }
        ]
      });
    }

    if (url.includes('/GetContextItemDetails/1/1') && method === 'GET') {
      return ok({
        Id: '1',
        Type: 'lane',
        Name: 'Deploy SQL Server',
        Status: 'completed',
        Actions: [
          {
            Id: 'run',
            Enabled: true
          }
        ]
      });
    }

    if (url.includes('/GetContextItemContent/1/1') && method === 'GET') {
      return ok('...yml text');
    }

    if (
      url.includes('/GetContextItemLogs/1/1?top=100&skip=0') &&
      method === 'GET'
    ) {
      return ok({
        TotalRows: 2,
        Content: '...logs text - top rows skipping rows\r\nnew line'
      });
    }

    return next.handle(request);
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
