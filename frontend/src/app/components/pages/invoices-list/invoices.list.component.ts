import { Component, ViewChild, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/models';
import { SessionService } from 'src/app/services/auth/session.service';
import { InvoiceService } from 'src/app/services/http/invoice.service';
import { InvoiceFormComponent } from '../../shared/invoice-form-component/invoice.form.component';

@Component({
  selector: 'invoices-list-component',
  templateUrl: './invoices.list.component.html',
  styleUrls: ['./invoices.list.component.scss'],
})
export class InvoicesListComponent implements OnInit {
  @ViewChild(InvoiceFormComponent) _invoiceForm!: InvoiceFormComponent;

  private _invoices: Invoice[] = [];
  private _isLoading: boolean = false;

  constructor(private service: InvoiceService) {}

  ngOnInit() {
    this.getInvoices();
  }

  get invoices(): Invoice[] {
    return this._invoices;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  getInvoices() {
    this._isLoading = true;
    this.service.get().subscribe(
      (invoices: Invoice[]) => {
        this._isLoading = false;
        this._invoices = invoices;
      },
      (error) => (this._isLoading = false)
    );
  }

  handleOpenNew() {
    this._invoiceForm.openNewForm();
  }

  onSuccess(invoice: Invoice) {
    this._invoices.push(invoice);
  }
}
