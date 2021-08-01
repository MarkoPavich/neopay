import { Component, ViewChild } from '@angular/core';
import { InvoiceFormComponent } from './components/invoice-form-component/invoice.form.component';

@Component({
  selector: 'invoices-list-component',
  templateUrl: './invoices.list.component.html',
  styleUrls: ['./invoices.list.component.scss']
})
export class InvoicesListComponent {
  @ViewChild(InvoiceFormComponent) _InvoiceForm: InvoiceFormComponent | undefined;
  constructor() { }

  handleAddNew(){
    this._InvoiceForm?.showAddNew();
  }

}
