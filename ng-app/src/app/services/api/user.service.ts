import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getSelfUser(): Observable<{ id: string; name: string }> {
    return this.http.get<{ id: string; name: string }>(
      'https://localhost:8080/api/v1/users/self'
    );
  }
}
