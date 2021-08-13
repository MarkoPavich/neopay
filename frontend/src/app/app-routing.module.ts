import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesListComponent } from './components/pages/invoices-list/invoices.list.component';

const routes: Routes = [
  {path: '', component: InvoicesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
