import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/models/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService{
  private _apiUrl = 'https://localhost:44332/api/invoice'  // TODO - refactor via config

  private _invoices: Invoice[] = [];

  constructor(private http: HttpClient){}

  getHttpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  get(): Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this._apiUrl)
  }

  post(invoice: Invoice): Observable<any>{
    return this.http.post(`${this._apiUrl}`, invoice, this.getHttpOptions())
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

  async put(invoice: Invoice){
    await new Promise(resolve => setTimeout(resolve, 500));
    this._invoices = this._invoices.map(inv => {
      return inv.id === invoice.id ? invoice : inv;
    })
  }

  async delete(id: string){
    await new Promise(resolve => setTimeout(resolve, 500));
    this._invoices = this._invoices.filter(invoice => invoice.id !== id);
  }
}