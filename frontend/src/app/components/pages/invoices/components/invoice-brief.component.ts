import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from 'src/app/models/models';

@Component({
  selector: 'invoice-brief',
  template: `
    
    <div (click)="onClick()" class="content-container">
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
  @Output('onClick') _clickEmitter = new EventEmitter<string>()

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

  onClick(): void {
    this._clickEmitter.emit(this._invoice.id);
  }
}