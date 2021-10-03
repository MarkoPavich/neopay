import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthBaseComponent } from "./auth-base.component";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent extends AuthBaseComponent implements OnInit{

  ngOnInit() {
    super.init();
    this._form = this.formFactory.loginForm();
  }

  get loginForm(): FormGroup{
    return this._form;
  };
}