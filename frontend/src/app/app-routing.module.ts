import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { URLS } from './constants/routing-constants';
import { InvoicesListComponent } from './components/pages/invoices-list/invoices.list.component';
import { InvoiceComponent } from './components/pages/invoice/invoice.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/login/register.component';
import { AuthenticationGuard } from './services/routeGuards/authentication.guard';


const routes: Routes = [
  {path: URLS.home, component: InvoicesListComponent, canActivate: [AuthenticationGuard]},
  {path: URLS.invoice, component: InvoiceComponent, canActivate: [AuthenticationGuard]},
  {path: URLS.login, component: LoginComponent},
  {path: URLS.register, component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
