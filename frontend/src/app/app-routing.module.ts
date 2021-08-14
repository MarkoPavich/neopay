import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesListComponent } from './components/pages/invoices-list/invoices.list.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';

const routes: Routes = [
  {path: 'tmp', component: InvoicesListComponent},
  {path: '', component: InvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
