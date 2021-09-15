import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginForm, RegistrationForm } from "src/app/models/models";
import { FormFactory } from "src/app/services/factories/form-factory.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { SessionService } from "src/app/services/auth/session.service";

@Directive()
export class AuthBaseComponent{
  protected _form!: FormGroup;
  protected _isLoading!: boolean;

  constructor(
    protected formFactory: FormFactory,
    private authService: AuthService,
    protected sessionService: SessionService,
    private router: Router
    ){}

  get isLoading(): boolean{
    return this._isLoading;
  }

  init(){
    this.sessionService.monitorIsLoading().subscribe(observer => {
      this._isLoading = observer;
    })
  }

  onRegistrationSubmit(){
    if(!this._isLoading){
      const form = this._form.value;
      if(form['password'] === form['confirm']){
        const registration: RegistrationForm = {
          username: form['username'],
          email: form['email'],
          password: form['password']
        }

        this.authService.register(registration).subscribe(() => {
          this.router.navigate(['']);
        })
      }
    }
  }

  onLoginSubmit(){
    if(!this._isLoading){
      const credentials = this._form.value as LoginForm;
      this.authService.login(credentials).subscribe(() => {
        this.router.navigate(['']);  // TODO - navigate to possible url from history, instead of default home
      });
    }
  }
}