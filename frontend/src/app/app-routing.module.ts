import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { URLS } from './constants/routing-constants';
import { InvoicesListComponent } from './components/pages/invoices-list/invoices.list.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { LoginComponent } from './components/pages/login/login.component';


const routes: Routes = [
  {path: URLS.home, component: InvoicesListComponent},
  {path: URLS.invoice, component: InvoiceComponent},
  {path: URLS.login, component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
