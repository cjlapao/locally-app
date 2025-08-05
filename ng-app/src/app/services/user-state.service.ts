import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserStateService {
  public currentUser$ = new BehaviorSubject<User | null>(null);

  public jwtToken$ = new BehaviorSubject<string | null>(null);
  public refreshToken$ = new BehaviorSubject<string | null>(null);
  public expiresAt$ = new BehaviorSubject<Date | null>(null);

  isAuthenticated(): boolean {
    return this.jwtToken$.getValue() !== null;
  }

  isExpired(): boolean {
    const expiresAt = this.expiresAt$.getValue();
    return !expiresAt || new Date() > expiresAt;
  }

  setTokens(token: string, refreshToken: string, expiresAt: Date): void {
    this.jwtToken$.next(token);
    this.refreshToken$.next(refreshToken);
    this.expiresAt$.next(expiresAt);
  }
}
