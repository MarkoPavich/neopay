import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/models/models';

@Component({
  selector: 'invoice-brief',
  template: `
    
    <div class="content-container">
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
        <status-info-button></status-info-button>
      </div>
    </div>
    `,
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceBriefComponent {
  @Input('invoice') _invoice!: Invoice;

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
}