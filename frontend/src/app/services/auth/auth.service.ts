import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginForm,
  RegistrationForm,
  SessionModel,
} from 'src/app/models/models';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = 'https://localhost:44332/api/auth/';

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

  googleSignIn(idToken: string): Observable<SessionModel> {
    return this.http.post<SessionModel>(this._apiUrl + 'google-signin', {
      idToken,
    });
  }
}
