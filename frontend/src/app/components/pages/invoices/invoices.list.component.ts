import { Component, ViewChild, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/models';
import { InvoiceService } from 'src/app/services/http/invoice.service';
import { InvoiceFormComponent } from './components/invoice-form-component/invoice.form.component';

@Component({
  selector: 'invoices-list-component',
  templateUrl: './invoices.list.component.html',
  styleUrls: ['./invoices.list.component.scss']
})
export class InvoicesListComponent implements OnInit {
  @ViewChild(InvoiceFormComponent) _InvoiceForm: InvoiceFormComponent | undefined;

  private _invoices: Invoice[] = [];

  constructor(private service: InvoiceService) { }

  ngOnInit() {
    this.getInvoices();
  }

  get invoices(): Invoice[]{
    return this._invoices;
  }

  async getInvoices(){
    this._invoices = await this.service.get();
  }

  handleAddNew(){
    this._InvoiceForm?.openNewForm();
  }

}
