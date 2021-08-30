import { NgModule } from "@angular/core";

import { LoginComponent } from "./login.component";
import { SharedComponentsModule } from "../../shared/shared.components.module.ts";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }