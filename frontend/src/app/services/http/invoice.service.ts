import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{
  private _invoices: Invoice[] = [];

  async get(): Promise<Invoice[]>{
    await new Promise(resolve => setTimeout(resolve, 500));
    return this._invoices;
  }

  async post(invoice: Invoice){
    // TODO - handle ID serverside, ofc
    invoice.id = Math.random().toString(36).replace(/[^0-9]+/g, '').substr(0, 6),
    await new Promise(resolve => setTimeout(resolve, 500));
    this._invoices.push(invoice);
  }

  async getById(invoiceId: string): Promise<Invoice>{
    await new Promise(resolve => setTimeout(resolve, 500));
    const invoice = this._invoices.find(invoice => invoice.id === invoiceId);
    
    if(invoice){
      return invoice;
    }
    else{
      throw new Error("No invoice with provided ID exists");
    }
  }
}