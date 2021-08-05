import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../shared/shared.components.module.ts';

import { InvoicesListComponent } from './invoices.list.component';
import { InvoiceComponent } from './components/invoice.component';
import { StatusInfoButtonComponent } from './components/status.info.button.component';
import { InvoicesHeaderComponent } from './components/invoices.header.component'
import { InvoiceFormComponent } from './components/invoice-form-component/invoice.form.component';


@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoicesHeaderComponent,
    InvoiceComponent,
    StatusInfoButtonComponent,
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
export class InvoicesModule { }