import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SessionModel, User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _session = new BehaviorSubject({
    user: null,
    token: '',
    refreshToken: '',
    validTo: '',
  } as SessionModel);

  private _tokenDuration: number = 0;
  private _isRefreshing: boolean = false;
  private _loading: BehaviorSubject<number> = new BehaviorSubject(0);

  get authToken(): string {
    return this._session.value.token;
  }

  get refreshToken(): string {
    return this._session.value.refreshToken;
  }

  get isRefreshing(): boolean {
    return this._isRefreshing;
  }

  set isRefreshing(isRefreshing: boolean) {
    this._isRefreshing = isRefreshing;
  }

  get user(): User | null {
    return this._session.value.user;
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  get isLoading(): Observable<boolean> {
    return this._loading
      .pipe(
        debounceTime(200),
        map((loadingCount: number) => {
          return loadingCount > 0;
        })
      )
      .pipe(distinctUntilChanged());
  }

  get tokenExpired(): boolean {
    return Date.now() > Date.parse(this._session.value.validTo);
  }

  get shouldRefresh(): boolean {
    const tokenExpires = Date.parse(this._session.value.validTo);

    // Refresh when duration over half duration
    return tokenExpires - Date.now() < this._tokenDuration / 2;
  }

  startLoading() {
    this._loading.next(this._loading.value + 1);
  }

  completeLoading() {
    this._loading.next(this._loading.value - 1);
  }

  setSession(session: SessionModel) {
    localStorage.setItem('refreshToken', session.refreshToken);
    this._tokenDuration = Date.parse(session.validTo) - Date.now();
    this._session.next(session);
  }

  clearSession() {
    const session: SessionModel = {
      user: null,
      token: '',
      refreshToken: '',
      validTo: '',
    };

    localStorage.removeItem('refreshToken');
    this.isRefreshing = false;
    this._session.next(session);
  }
}
