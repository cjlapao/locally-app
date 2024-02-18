import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LocationType } from '../context/new-context-wizard-dialog/location-page/location-type';
import { Context } from '../browser/context-navigation/context-state.service';

export type GetAllContextsResponse = Array<{
  Id: string;
  Name: string;
  Enabled: boolean;
  Valid: boolean;
  Location: string;
  Type: LocationType;
}>;

@Injectable({
  providedIn: 'root',
})
export class ContextBackendService {
  constructor(private http: HttpClient) {}

  getAllContexts(): Observable<Array<Context>> {
    return this.http.get<GetAllContextsResponse>('/GetAllContexts').pipe(
      map((contexts) =>
        contexts.map(
          (context) =>
            ({
              id: context.Id,
              active: false,
              name: context.Name,
              enabled: context.Enabled,
              valid: context.Valid,
              location: context.Location,
              type: context.Type,
            }) as Context,
        ),
      ),
    );
  }
}
