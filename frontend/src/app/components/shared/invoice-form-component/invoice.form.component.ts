import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { InvoiceFormFactory } from 'src/app/services/factories/invoice-form-factory.service';
import { Invoice, InvoiceItem } from 'src/app/models/models';
import { InvoiceService } from 'src/app/services/http/invoice.service';
import { FormHelperService } from 'src/app/services/helpers/form-helper.service';
import { InvoiceStatus } from 'src/app/enums/enums';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice.form.component.html',
  styleUrls: ['./invoice.form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  @Output('success') _eventEmitter = new EventEmitter<Invoice>();

  private _isNew: boolean = true;
  private _isActive: boolean = false;
  private _invoiceForm!: FormGroup;

  constructor(
    private formFactory: InvoiceFormFactory,
    private service: InvoiceService,
    private formHelpers: FormHelperService
  ) {}

  ngOnInit() {
    this._invoiceForm = this.formFactory.invoiceForm();
    this.formFactory.getPaymentTerms();
  }

  get isNew(): boolean {
    return this._isNew;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get invoiceForm(): FormGroup {
    return this._invoiceForm;
  }

  get invoiceItems(): FormArray {
    return this._invoiceForm.get('items') as FormArray;
  }

  get invoiceId(): string {
    return this._invoiceForm.get('id')?.value;
  }

  get paymentTermOptions() {
    return this.formFactory.getPaymentTerms();
  }

  get invoiceStatus(): typeof InvoiceStatus {
    return InvoiceStatus;
  }

  getFormGroupAtIndex(index: number): FormGroup {
    return this.invoiceItems.at(index) as FormGroup;
  }

  getTotal(index: number): string {
    const item: InvoiceItem = this.invoiceItems.at(index).value;
    const total = item.price * item.quantity;
    return `${total.toFixed(2)}`; // TODO - add better rounding
  }

  closeForm(): void {
    this._isActive = false;
    this._invoiceForm.reset();
  }

  openNewForm(): void {
    this._invoiceForm.patchValue(this.formFactory.invoiceForm());
    this._isNew = true;
    this._isActive = true;
  }

  openEditForm(invoice: Invoice) {
    this._invoiceForm.reset();

    this._invoiceForm.patchValue({
      id: invoice.id,
      items: invoice.items,
      billFrom: invoice.billFrom,
      billTo: invoice.billTo,
    });

    this._isNew = false;
    this._isActive = true;
  }

  addItem(): void {
    this.invoiceItems.push(this.formFactory.invoiceItemForm());
  }

  removeItem(index: number): void {
    this.invoiceItems.removeAt(index);
  }

  onSubmit(status: InvoiceStatus): void {
    if (this._invoiceForm.valid) {
      const invoice: Invoice = this._invoiceForm.value;

      if (invoice.billTo.invoiceDate instanceof Date) {
        invoice.billTo.invoiceDate =
          invoice.billTo.invoiceDate.toLocaleDateString('UTC');
      }

      invoice.status = status;
      if (this._isNew) {
        this.service.post(invoice).subscribe((invoice) => {
          this._eventEmitter.emit(invoice);
        });
      } else {
        this.service.put(invoice).subscribe((invoice) => {
          this._eventEmitter.emit(invoice);
        });
      }
      this.closeForm();
    } else {
      this.formHelpers.markAllAsDirty(this._invoiceForm);
    }
  }
}
