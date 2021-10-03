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

  login(credentials: LoginForm): Observable<void> {
    this.sessionService.setIsLoading(true);

    return new Observable((subscriber) => {
      this.http
        .post(this._apiUrl + 'login', credentials, this._headers)
        .subscribe(
          (response) => {
            this.sessionService.setSession(response as SessionModel);
            this.sessionService.setIsLoading(false);
            subscriber.next();
            subscriber.complete();
          },
          (err) => {
            console.log(err);
            alert('Something went wrong'); // TODO
            this.sessionService.setIsLoading(false);
          }
        );
    });
  }

  register(form: RegistrationForm): Observable<void> {
    this.sessionService.setIsLoading(true);

    return new Observable((subscriber) => {
      this.http.post(this._apiUrl + 'register', form, this._headers).subscribe(
        (response) => {
          this.sessionService.setSession(response as SessionModel);
          this.sessionService.setIsLoading(false);
          subscriber.next();
          subscriber.complete();
        },
        (err) => {
          console.log(err);
          alert('Something went wrong'); // TODO
          this.sessionService.setIsLoading(false);
        }
      );
    });
  }

  googleSignIn(idToken: string): Observable<any> {
    return this.http.post(this._apiUrl + 'google-signin', { idToken });
  }
}
