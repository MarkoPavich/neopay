import { NgModule } from '@angular/core';

import { InvoicesComponent } from './invoices.component';
import { InvoicesHeaderComponent } from './components/invoices.header.component'
import { SharedComponentsModule } from '../../shared/shared.components.module.ts';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoicesHeaderComponent,
  ],
  exports: [
    InvoicesComponent
  ],
  imports: [
    SharedComponentsModule
  ]
})
export class InvoicesModule { }