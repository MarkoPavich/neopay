import { Component, ViewChild, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/models';
import { InvoiceService } from 'src/app/services/http/invoice.service';
import { InvoiceFormComponent } from '../../shared/invoice-form-component/invoice.form.component';

@Component({
  selector: 'invoices-list-component',
  templateUrl: './invoices.list.component.html',
  styleUrls: ['./invoices.list.component.scss']
})
export class InvoicesListComponent implements OnInit {
  @ViewChild(InvoiceFormComponent) _invoiceForm!: InvoiceFormComponent;

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

  handleOpenNew(){
    this._invoiceForm.openNewForm();
  }
}
