import { NgModule } from '@angular/core';

import { InvoicesComponent } from './invoices.component';
import { InvoicesHeaderComponent } from './components/invoices.header.component'

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesHeaderComponent
  ],
  exports: [
    InvoicesComponent
  ]
})
export class InvoicesModule { }