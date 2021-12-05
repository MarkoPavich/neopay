import { Component, ViewChild, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Invoice,
  InvoiceStatusFilter,
  StatusFiltersResponse,
} from 'src/app/models/models';
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
    private formFactory: FormFactory,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this._isLoading = true;
    this.init();
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

  init() {
    this.service
      .statusFiltersLookup()
      .subscribe((statusFilters: StatusFiltersResponse[]) => {
        this.initFilters(statusFilters);

        this.getInvoices();
      });
  }

  onStatusFiltersChange(statusFilters: InvoiceStatusFilter[]) {
    const appliedStatusFilters = [];

    for (const filter of statusFilters) {
      if (filter.checked) {
        appliedStatusFilters.push(filter.value);
      }
    }

    this.getInvoices();
    // append queryParams to url
    this.router.navigate(['/'], {
      queryParams: { statusFilter: appliedStatusFilters },
    });
  }

  getInvoices() {
    this._isLoading = true;
    const filters = this.statusFiltersForm.value as InvoiceStatusFilter[];
    const filterValues = [];

    for (const filter of filters) {
      if (filter.checked) {
        filterValues.push(filter.value);
      }
    }

    this.service.get(filterValues).subscribe((invoices: Invoice[]) => {
      this._isLoading = false;
      this._invoices = invoices;
    });
  }

  initFilters(statusFilters: StatusFiltersResponse[]) {
    this._statusFiltersForm =
      this.formFactory.invoiceFiltersForm(statusFilters);

    this.route.queryParams.forEach((params: any) => {
      const statusFilterParams = params['statusFilter'];
      let filterValues: string[] = [];

      if (statusFilterParams) {
        if (statusFilterParams instanceof Array) {
          filterValues = statusFilterParams as string[];
        } else {
          filterValues.push(statusFilterParams);
        }

        const filters = this._statusFiltersForm.value as InvoiceStatusFilter[];
        for (const filter of filters) {
          if (!filterValues.includes(filter.value.toString())) {
            filter.checked = false;
          }
        }
        this._statusFiltersForm.patchValue(filters);
      }
    });

    this._statusFiltersForm.valueChanges.subscribe(
      (statusFilters: InvoiceStatusFilter[]) => {
        this.onStatusFiltersChange(statusFilters);
      }
    );
  }

  handleOpenNew() {
    this._invoiceForm.openNewForm();
  }

  onSuccess(invoice: Invoice) {
    this._invoices.push(invoice);
  }
}
