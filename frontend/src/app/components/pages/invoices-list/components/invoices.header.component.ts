import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'invoices-header-component',
  templateUrl: './invoices.header.component.html',
  styleUrls: ['./invoices.header.component.scss']
})
export class InvoicesHeaderComponent {
  @Input('invoicesNum') _invoicesNum: number = 0;
  @Output('onClick') _clickEmitter = new EventEmitter<void>();

  constructor() {}

  get invoicesNum(): number{
    return this._invoicesNum;
  }

  onAddNew(){
    this._clickEmitter.emit();
  }
}