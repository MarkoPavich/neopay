import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormFactory } from "src/app/services/factories/form-factory.service";

@Directive()
export class AuthBaseComponent{
  protected _form!: FormGroup;
  protected _formFactory: FormFactory;

  constructor(private formFactory: FormFactory){
    this._formFactory = formFactory
  }
}