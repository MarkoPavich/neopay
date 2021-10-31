import { Component, Input } from '@angular/core';
import { InvoiceStatus } from 'src/app/enums/enums';

@Component({
  selector: 'status-info-label',
  template: `
    <div [ngClass]="'info-label status-' + statusSpan">
      <div class="bulletpoint"></div>
      <span class="status-span">{{statusSpan}}</span>
    </div>
  `,
  styleUrls: ['./status-info-label.component.scss'],
})
export class StatusInfoLabelComponent {
  @Input('invoiceStatus') _status!: InvoiceStatus;

  get statusSpan(): string {
    switch (this._status) {
      case InvoiceStatus.draft:
        return 'Draft';
      case InvoiceStatus.paid:
        return 'Paid';
      case InvoiceStatus.pending:
        return 'Pending';
    }
  }
}
