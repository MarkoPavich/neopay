import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/models';
import { URLS } from 'src/app/constants/routing-constants';

@Component({
  selector: 'invoice-brief',
  template: `
    
    <div (click)="navigateInvoice()" class="content-container">
      <div class="container-left">
        <span class="hash-prefix">#</span>
        <span>{{invoice.id}}</span>
      </div>
      <div class="container-middle">
        <span>Due {{invoice.billTo.terms}}</span>
        <span>{{invoice.billTo.clientName}}</span>
      </div>
      <div class="container-right">
        <div class="price-box">
          <span>£ </span>
          <span>{{total}}</span>
        </div>
        <div class="status-container">
          <status-info-label></status-info-label>
          <img src="./assets/icon-arrow-right.svg" alt="gotoDetails.img">
        </div>
      </div>
    </div>
    `,
  styleUrls: ['./invoice-brief.component.scss']
})

export class InvoiceBriefComponent {
  @Input('invoice') _invoice!: Invoice;

  constructor(private router: Router) {}

  get invoice(): Invoice{
    return this._invoice
  }

  get total(): string{
    let total = 0;
    for(const item of this.invoice.items){
      total = total + item.price * item.quantity;
    }

    // TODO - rework this
    return total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  navigateInvoice(): void {
    this.router.navigate([URLS.invoice, {id: this._invoice.id}])
  }
}