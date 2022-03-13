import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice, InvoiceItem } from 'src/app/models/models';
import { InvoiceService } from 'src/app/services/http/invoice.service';
import { URLS } from 'src/app/constants/routing-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceFormComponent } from '../../shared/invoice-form-component/invoice.form.component';
import { InvoiceStatus, PaymentTermsStringRep } from 'src/app/enums/enums';
import { ModalService } from 'src/app/services/modals/modal.service';
import { Location } from '@angular/common';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @ViewChild(InvoiceFormComponent) _invoiceForm!: InvoiceFormComponent;

  private _invoice!: Invoice;

  constructor(
    private service: InvoiceService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const invoiceId: string = this.route.snapshot.params.id;
    this.service.getById(invoiceId).subscribe((invoice) => {
      this._invoice = invoice;
    });
  }

  get homeUrl(): string {
    return URLS.home;
  }

  get haveModel(): boolean {
    return this._invoice ? true : false;
  }

  get invoiceId(): string {
    return this._invoice.id;
  }

  get billFrom() {
    return this._invoice.billFrom;
  }

  get billTo() {
    return this._invoice.billTo;
  }

  get invoiceItems(): InvoiceItem[] {
    return this._invoice.items;
  }

  get invoiceStatus(): InvoiceStatus {
    return this._invoice.status;
  }

  get totalSum(): string {
    let total = 0;

    for (const item of this.invoiceItems) {
      total = total + item.price * item.quantity;
    }

    return `${total.toFixed(2)}`;
  }

  get paymentTerm() {
    return PaymentTermsStringRep[this._invoice.billTo.dueDate];
  }

  get invoiceDate(): string {
    const date = new Date(this._invoice.billTo.invoiceDate);
    return date.toLocaleString('default', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  get isDraft(): boolean {
    return this._invoice.status === InvoiceStatus.draft;
  }

  get isPending(): boolean {
    return this._invoice.status === InvoiceStatus.pending;
  }

  getItemSum(index: number): string {
    const item: InvoiceItem = this.invoiceItems[index];
    const sum = item.price * item.quantity;
    return `${sum.toFixed(2)}`; // TODO - add better rounding
  }

  handleOnEdit() {
    this._invoiceForm.openEditForm(this._invoice);
  }

  onSuccess(invoice: Invoice) {
    this._invoice = invoice;
  }

  sendDraft(): void {
    const predicate = `issue invoice ${this._invoice.id}`;

    this.modalService
      .confirmationDialog(predicate)
      .subscribe((selection: boolean) => {
        if (selection) {
          this._invoiceForm.submitDraft(this._invoice);
        }
      });
  }

  handleOnDelete() {
    this.modalService
      .deleteDialog(this._invoice.id)
      .subscribe((selection: boolean) => {
        if (selection) {
          this.service.delete(this._invoice.id).subscribe(() => {
            this.router.navigate(['']);
          });
        }
      });
  }

  setStatusPaid() {
    const predicate = `mark invoice ${this._invoice.id} as paid`;

    this.modalService
      .confirmationDialog(predicate)
      .subscribe((Selection: boolean) => {
        if (Selection) {
          this.service.setStatusPaid(this._invoice.id).subscribe(() => {
            this._invoice.status = InvoiceStatus.paid;
          });
        }
      });
  }

  onNavigateBack() {
    this.location.back();
  }
}
