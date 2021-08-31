import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { LoginComponent } from "./login.component";
import { SharedComponentsModule } from "../../shared/shared.components.module.ts";
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from "./register.component";

@NgModule({
  imports: [
    SharedComponentsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginModule { }