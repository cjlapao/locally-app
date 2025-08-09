import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthStateService } from '../auth-state.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private authStateService = inject(AuthStateService);

  getSelfUser(): Observable<{ id: string; name: string; roles: string[] }> {
    return this.http
      .get<{
        id: string;
        name: string;
        roles: { name: string }[];
      }>('http://localhost:8080/api/v1/users/self', {
        headers: {
          Authorization: `Bearer ${this.authStateService.jwtToken()}`
        }
      })
      .pipe(
        map((response) => ({
          id: response.id,
          name: response.name,
          roles: response.roles.map((role) => role.name)
        }))
      );
  }
}
