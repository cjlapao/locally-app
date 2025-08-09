import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private version = '1';

  jwtToken = signal<string | null>(
    JSON.parse(sessionStorage.getItem(`jwtToken-${this.version}`) || 'null')
  );

  tokenPayload = computed((): any | null => {
    const thisToken = this.jwtToken();
    if (!thisToken) return null;

    return JSON.parse(atob(thisToken.split('.')[1]));
  });

  expiredAt = computed((): Date | null => {
    const tokenPayload = this.tokenPayload();
    if (!tokenPayload) return null;

    return new Date(tokenPayload.exp * 1000);
  });

  syncStorage = effect(() => {
    sessionStorage.setItem(
      `jwtToken-${this.version}`,
      JSON.stringify(this.jwtToken())
    );
  });

  isExpired = computed((): boolean => {
    const expiredAt = this.expiredAt();
    if (!expiredAt) return true;

    return Date.now() > expiredAt.getTime();
  });

  isAuthenticated = computed((): boolean => {
    const thisToken = this.jwtToken();
    const isExpired = this.isExpired();

    return thisToken !== null && !isExpired;
  });

  logout() {
    this.jwtToken.set(null);
  }
}
