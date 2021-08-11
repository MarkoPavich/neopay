import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/models/models';

@Component({
  selector: 'invoice-item',
  template: `
    
    <div class="content-container">
      <div class="container-left">
        <span class="hash-prefix">#</span>
        <span>RTX3080</span>
      </div>
      <div class="container-middle">
        <span>Due  19 Aug 2021</span>
        <span>Jensen Huang</span>
      </div>
      <div class="container-right">
        <div class="price-box">
          <span>£ </span>
          <span>1,800.90</span>
        </div>
        <status-info-button></status-info-button>
      </div>
    </div>
    `,
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceItemComponent {
  @Input('invoice') _invoice!: Invoice;

  get invoice(): Invoice{
    return this._invoice
  }
}