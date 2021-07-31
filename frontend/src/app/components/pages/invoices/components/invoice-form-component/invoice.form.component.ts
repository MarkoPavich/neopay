import { Component } from '@angular/core';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice.form.component.html',
  styleUrls: ['./invoice.form.component.scss']
})

export class InvoiceFormComponent {
  private _isNew: boolean = true;
  public _tmpInvoiceName: string = 'RT3080';

  constructor () {}

  get isNew(){
    return this._isNew;
  }
}