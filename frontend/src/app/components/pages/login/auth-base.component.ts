import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LoginForm } from "src/app/models/models";
import { FormFactory } from "src/app/services/factories/form-factory.service";
import { AuthService } from "src/app/services/http/auth.service";

@Directive()
export class AuthBaseComponent{
  protected _form!: FormGroup;
  protected _formFactory: FormFactory;

  constructor(
    private formFactory: FormFactory,
    private authService: AuthService
    ){
    this._formFactory = formFactory;
  }

  onLoginSubmit(){
    const credentials = this._form.value as LoginForm;
    
    this.authService.login(credentials).subscribe(
      res => { console.log("response ", res);}, // TODO - continue here
      err => {
        console.log(err);  // TODO - proper error handling
        alert("Invalid username and/or password");
      }
      )
  }
}