import { Component } from '@angular/core';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice.form.component.html',
  styleUrls: ['./invoice.form.component.scss']
})

export class InvoiceFormComponent {
  private _isNew: boolean = true;
  private _isActive:boolean = false;

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

  showAddNew(){
    this._isNew = true;
    this._isActive = true;
  }

}