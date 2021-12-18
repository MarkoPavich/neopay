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
    expires: '',
  } as SessionModel);

  private _loading: BehaviorSubject<number> = new BehaviorSubject(0);

  get authToken(): string {
    return this._session.value['token'];
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

  startLoading() {
    this._loading.next(this._loading.value + 1);
  }

  completeLoading() {
    this._loading.next(this._loading.value - 1);
  }

  setSession(session: SessionModel) {
    localStorage.setItem('refreshToken', session.refreshToken);
    this._session.next(session);
  }

  clearSession() {
    const session: SessionModel = {
      user: null,
      token: '',
      refreshToken: '',
      expires: '',
    };

    localStorage.removeItem('refreshToken');
    this._session.next(session);
  }
}
