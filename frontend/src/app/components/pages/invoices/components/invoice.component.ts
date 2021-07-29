import { Component } from '@angular/core';

@Component({
  selector: 'invoice',
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
          <span>€</span>
          <span>1,800.90</span>
        </div>
        <div class="status-box">

        </div>
      </div>
    </div>
    `,
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent {}