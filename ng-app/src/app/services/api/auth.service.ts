import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

import { AuthorizationError } from '../../shared/errors/authorization-error';
import { TechnicalError } from '../../shared/errors/technical-error';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(
    username: string,
    password: string
  ): Observable<{ token: string; refreshToken: string; expiresAt: Date }> {
    return this.http
      .post<{
        token: string;
        refresh_token: string;
        expires_at: Date;
      }>(
        'http://localhost:8080/api/v1/auth/login',
        { username, password },
        {
          headers: {
            'X-Tenant-ID': 'global-tenant'
          }
        }
      )
      .pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              throw new AuthorizationError();
            }
          }

          throw new TechnicalError();
        }),
        map((response) => ({
          token: response.token,
          refreshToken: response.refresh_token,
          expiresAt: new Date(response.expires_at)
        }))
      );
  }
}
