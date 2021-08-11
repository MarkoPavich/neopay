import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{
  private _invoices: Invoice[] = [];

  async get(){
    await new Promise(resolve => setTimeout(resolve, 1500));
    return this._invoices;
  }

  async post(invoice: Invoice){
    await new Promise(resolve => setTimeout(resolve, 1500));
    this._invoices.push(invoice);
    console.log("Completed")
  }
}