import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormFactory } from "src/app/services/factories/form-factory.service";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit{
  private _loginForm!: FormGroup;

  constructor(private formFactory: FormFactory) {}

  ngOnInit() {
    this._loginForm = this.formFactory.loginForm();
  }

  get loginForm(): FormGroup{
    return this._loginForm
  }
}