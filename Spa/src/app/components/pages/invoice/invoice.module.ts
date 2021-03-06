import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InvoiceComponent } from './invoice.component';
import { SharedComponentsModule } from '../../shared/shared.components.module.ts';

@NgModule({
  imports: [
    SharedComponentsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    InvoiceComponent
  ],
  exports: [
    InvoiceComponent
  ],
  providers:[
    DatePipe
  ]
})
export class InvoiceModule { }
