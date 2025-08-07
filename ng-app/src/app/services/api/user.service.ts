import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthStateService } from '../auth-state.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private authStateService = inject(AuthStateService);

  getSelfUser(): Observable<{ id: string; name: string }> {
    return this.http.get<{ id: string; name: string }>(
      'http://localhost:8080/api/v1/users/self',
      {
        headers: {
          Authorization: `Bearer ${this.authStateService.jwtToken()}`,
          'X-Tenant-ID': 'global-tenant'
        }
      }
    );
  }
}
