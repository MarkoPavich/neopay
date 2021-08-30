import { NgModule } from "@angular/core"; 

import { InvoicesListModule } from "./invoices-list/invoices-list.module";
import { InvoiceModule } from "./invoice/invoice.module";

@NgModule({
  imports: [
    InvoicesListModule,
    InvoiceModule
  ]
})
export class PagesModule { }