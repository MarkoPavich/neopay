import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthBaseComponent } from "./auth-base.component";

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['login.component.scss']
})
export class RegisterComponent extends AuthBaseComponent implements OnInit {
  
  ngOnInit() {
    this._form = this._formFactory.registerForm();
  }

  get registerForm(): FormGroup{
    return this._form;
  }
}