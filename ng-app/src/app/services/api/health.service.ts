import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);

  isHealthy(): Observable<boolean> {
    return this.http.get<string>('https://localhost:8080/api/v1/health').pipe(
      catchError(() => of(false)),
      map((response) => response === 'OK')
    );
  }
}
