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
        roles: string[];
      }>('http://localhost:8080/api/v1/users/self', {
        headers: {
          Authorization: `Bearer ${this.authStateService.jwtToken()}`
        }
      })
      .pipe(
        map((response) => ({
          id: response.id,
          name: response.name,
          roles: response.roles
        }))
      );
  }

  getUsers(): Observable<{
    total_count: number;
    pagination: { page: number; page_size: number; total_pages: number };
    data: { id: string; name: string; status: string }[];
  }> {
    return this.http
      .get<{
        total_count: number;
        pagination: { page: number; page_size: number; total_pages: number };
        data: { id: string; name: string; status: string }[];
      }>('http://localhost:8080/api/v1/users', {
        headers: {
          Authorization: `Bearer ${this.authStateService.jwtToken()}`
        }
      })
      .pipe(
        map((response) => ({
          total_count: response.total_count,
          pagination: response.pagination,
          data: response.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status
          }))
        }))
      );
  }

  getUser(
    userId: string
  ): Observable<{ id: string; name: string; [key: string]: any }> {
    return this.http
      .get<{ id: string; name: string; [key: string]: any }>(
        `http://localhost:8080/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${this.authStateService.jwtToken()}`
          }
        }
      )
      .pipe(
        map((response) => ({
          ...response
        }))
      );
  }
}
