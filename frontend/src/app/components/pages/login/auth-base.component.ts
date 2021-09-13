import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoginForm } from "src/app/models/models";
import { FormFactory } from "src/app/services/factories/form-factory.service";
import { AuthService } from "src/app/services/http/auth.service";
import { SessionService } from "src/app/services/http/session.service";

@Directive()
export class AuthBaseComponent{
  protected _form!: FormGroup;
  protected _isLoading!: boolean;

  constructor(
    protected formFactory: FormFactory,
    private authService: AuthService,
    protected sessionService: SessionService
    ){}

  get isLoading(): boolean{
    return this._isLoading;
  }

  init(){
    this.sessionService.monitorIsLoading().subscribe(observer => {
      this._isLoading = observer;
    })
  }

  onLoginSubmit(){
    if(!this._isLoading){
      const credentials = this._form.value as LoginForm;
      this.authService.login(credentials);
    }
  }
}