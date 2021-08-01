import { Component } from '@angular/core';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice.form.component.html',
  styleUrls: ['./invoice.form.component.scss']
})

export class InvoiceFormComponent {
  private _isNew: boolean = true;
  private _isActive:boolean = true;

  public _tmpInvoiceName: string = 'RT3080';

  constructor () {}

  get isNew(){
    return this._isNew;
  }

  get isActive(){
    return this._isActive;
  }

  closeForm(){
    this._isActive = false;
  }

  showForm(){
    this._isActive = true;
  }
}