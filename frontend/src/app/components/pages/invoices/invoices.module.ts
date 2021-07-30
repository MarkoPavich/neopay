import { NgModule } from '@angular/core';

import { InvoicesListComponent } from './invoices.list.component';
import { InvoiceComponent } from './components/invoice.component';
import { StatusInfoButtonComponent } from './components/status.info.button.component';
import { InvoicesHeaderComponent } from './components/invoices.header.component'
import { SharedComponentsModule } from '../../shared/shared.components.module.ts';

@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoicesHeaderComponent,
    InvoiceComponent,
    StatusInfoButtonComponent
  ],
  exports: [
    InvoicesListComponent
  ],
  imports: [
    SharedComponentsModule
  ]
})
export class InvoicesModule { }