import { NgModule } from "@angular/core"; 

import { InvoicesListModule } from "./invoices-list/invoices-list.module";
import { InvoiceModule } from "./invoice/invoice.module";
import { LoginModule } from "./login/login.module";
import { SharedComponentsModule } from "../shared/shared.components.module.ts";

@NgModule({
  imports: [
    InvoicesListModule,
    InvoiceModule,
    LoginModule,
    SharedComponentsModule
  ]
})
export class PagesModule { }