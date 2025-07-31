import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

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
        map((response) => ({
          token: response.token,
          refreshToken: response.refresh_token,
          expiresAt: new Date(response.expires_at)
        }))
      );
  }
}
