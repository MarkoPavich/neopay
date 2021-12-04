import { Component, ViewChild, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Invoice, InvoiceStatusFilter, StatusFiltersResponse } from 'src/app/models/models';
import { FormFactory } from 'src/app/services/factories/form-factory.service';
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
  private _statusFiltersForm: FormArray = new FormArray([]);

  constructor(
    private service: InvoiceService,
    private formFactory: FormFactory
  ) {}

  ngOnInit() {
    this.getInvoices();
    this.getStatusFilters();
  }

  get statusFiltersForm(): FormArray {
    return this._statusFiltersForm;
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

  initFilters(statusFilters: StatusFiltersResponse[]) {
    this._statusFiltersForm =
      this.formFactory.invoiceFiltersForm(statusFilters);
  }

  getStatusFilters() {
    this.service
      .statusFiltersLookup()
      .subscribe((statusFilters: StatusFiltersResponse[]) => {
        this.initFilters(statusFilters);
      });
  }

  handleOpenNew() {
    this._invoiceForm.openNewForm();
  }

  onSuccess(invoice: Invoice) {
    this._invoices.push(invoice);
  }
}
