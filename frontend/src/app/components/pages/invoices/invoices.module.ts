import { NgModule } from '@angular/core';

import { InvoicesListComponent } from './invoices.list.component';
import { InvoiceComponent } from './components/invoice.component';
import { InvoicesHeaderComponent } from './components/invoices.header.component'
import { SharedComponentsModule } from '../../shared/shared.components.module.ts';

@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoicesHeaderComponent,
    InvoiceComponent
  ],
  exports: [
    InvoicesListComponent
  ],
  imports: [
    SharedComponentsModule
  ]
})
export class InvoicesModule { }