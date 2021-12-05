import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  GoogleSignInResponse,
  LoginForm,
  RegistrationForm,
  SessionModel,
} from 'src/app/models/models';
import { AuthFormFactory } from 'src/app/services/factories/auth-form-factory.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SessionService } from 'src/app/services/auth/session.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Directive()
export class AuthBaseComponent {
  // TODO - toasts
  protected _form!: FormGroup;
  protected _isLoading!: boolean;

  constructor(
    protected formFactory: AuthFormFactory,
    private authService: AuthService,
    protected sessionService: SessionService,
    protected router: Router,
    protected socialAuthService: SocialAuthService
  ) {}

  onSuccessful(session: SessionModel) {
    this.sessionService.setSession(session);
    this.router.navigate(['']); // TODO - navigate to possible url from history, instead of default home
  }

  onRegistrationSubmit() {
    if (this._form.valid) {
      const form = this._form.value;
      // TODO - custom validator
      if (form['password'] === form['confirm']) {
        const registration: RegistrationForm = {
          ...form,
        };
        this.authService
          .register(registration)
          .subscribe((response: SessionModel) => {
            this.onSuccessful(response);
          });
      }
    } else {
      // TODO user notification
    }
  }

  onLoginSubmit() {
    if (this._form.valid) {
      const credentials: LoginForm = this._form.value;
      this.authService
        .login(credentials)
        .subscribe((response: SessionModel) => {
          this.onSuccessful(response);
        });
    }
  }

  googleSignIn() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response: GoogleSignInResponse) => {
        this.authService
          .googleSignIn(response.idToken)
          .subscribe((response: SessionModel) => {
            this.onSuccessful(response);
          });
      })
      .catch((error) => {
        // TODO
      });
  }
}
