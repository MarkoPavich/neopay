import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/models';
import { URLS } from 'src/app/constants/routing-constants';
import { PaymentTermsStringRep } from 'src/app/enums/enums';

@Component({
  selector: 'invoice-brief',
  template: `
    <div (click)="navigateInvoice()" class="content-container">
      <div class="container-left">
        <div class="invoice-id-container">
          <span class="hash-prefix">#</span>
          <span>{{ invoice.id }}</span>
        </div>
        <div class="client-price-container container-mobile">
          <span>{{ invoice.billTo.clientName }}</span>
        </div>
        <div class="dude-date-container container-desktop">
          <span>Due {{ paymentTerm }}</span>
        </div>
      </div>
      <div class="container-right">
        <div class="duedate-price-container container-mobile">
          <div class="dude-date-container">
            <span>Due {{ paymentTerm }}</span>
          </div>
          <div class="price-box">
            <span>£ </span>
            <span>{{ total }}</span>
          </div>
        </div>
        <div class="client-price-container container-desktop">
          <span>{{ invoice.billTo.clientName }}</span>
          <div class="price-box">
            <span>£ </span>
            <span>{{ total }}</span>
          </div>
        </div>
        <div class="status-container">
          <status-info-label
            [invoiceStatus]="invoice.status"
          ></status-info-label>
          <img src="./assets/icon-arrow-right.svg" alt="gotoDetails.img" />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./invoice-brief.component.scss'],
})
export class InvoiceBriefComponent {
  @Input('invoice') _invoice!: Invoice;

  constructor(private router: Router) {}

  get invoice(): Invoice {
    return this._invoice;
  }

  get total(): string {
    let total = 0;
    for (const item of this.invoice.items) {
      total = total + item.price * item.quantity;
    }

    // TODO - rework this
    return total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  get paymentTerm() {
    return PaymentTermsStringRep[this._invoice.billTo.dueDate];
  }

  navigateInvoice(): void {
    this.router.navigate([URLS.invoice, { id: this._invoice.id }]);
  }
}
