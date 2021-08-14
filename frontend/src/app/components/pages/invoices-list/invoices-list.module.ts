import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../shared/shared.components.module.ts';

import { InvoicesListComponent } from './invoices.list.component';
import { InvoiceBriefComponent } from './components/invoice-brief.component';
import { InvoicesHeaderComponent } from './components/invoices.header.component'
import { InvoiceFormComponent } from './components/invoice-form-component/invoice.form.component';


@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoicesHeaderComponent,
    InvoiceBriefComponent,
    InvoiceFormComponent,
  ],
  exports: [
    InvoicesListComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class InvoicesListModule { }