import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import {
  LoginForm,
  RegistrationForm,
  SessionModel,
} from 'src/app/models/models';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = `${environment.apiRootUrl}/auth/`;

  private _headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  login(credentials: LoginForm): Observable<SessionModel> {
    return this.http.post<SessionModel>(
      this._apiUrl + 'login',
      credentials,
      this._headers
    );
  }

  register(form: RegistrationForm): Observable<SessionModel> {
    return this.http.post<SessionModel>(
      this._apiUrl + 'register',
      form,
      this._headers
    );
  }

  refresh(refreshToken: string): Observable<boolean> {
    let body = new HttpParams();
    body = body.append('refreshToken', refreshToken);

    this.sessionService.isRefreshing = true;

    return this.http
      .post<SessionModel>(this._apiUrl + 'refresh', body)
      .pipe(
        map((response: SessionModel) => {
          this.sessionService.setSession(response);
          return true;
        })
      )
      .pipe(
        take(1),
        finalize(() => (this.sessionService.isRefreshing = false))
      );
  }

  googleSignIn(idToken: string): Observable<SessionModel> {
    return this.http.post<SessionModel>(this._apiUrl + 'google-signin', {
      idToken,
    });
  }
}
