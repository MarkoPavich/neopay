import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'invoices-header-component',
  templateUrl: './invoices.header.component.html',
  styleUrls: ['./invoices.header.component.scss']
})
export class InvoicesHeaderComponent {
  @Output() onAddNewInvoice = new EventEmitter<void>();

  constructor() {}

  onAddNew(){
    this.onAddNewInvoice.emit();
  }
}