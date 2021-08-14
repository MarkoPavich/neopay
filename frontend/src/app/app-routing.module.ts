import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesListComponent } from './components/pages/invoices-list/invoices.list.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { URLS } from './constants/routing-constants';

const routes: Routes = [
  {path: URLS.home, component: InvoicesListComponent},
  {path: URLS.invoice, component: InvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
