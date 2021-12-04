import { Injectable } from '@angular/core';
import { Invoice, InvoiceStatusFilter } from 'src/app/models/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private _apiUrl = 'https://localhost:44332/api/invoice'; // TODO - refactor via config

  private _headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  get(filters?: InvoiceStatusFilter[]): Observable<Invoice[]> {
    let filterParams = new HttpParams()

    if (filters) {
      for (const filter of filters) {
        if(filter.checked){
          filterParams = filterParams.append('statusFilter', filter.value)
        }
      }
    }

    return this.http.get<Invoice[]>(this._apiUrl, {params: filterParams});
  }

  post(invoice: Invoice): Observable<any> {
    return this.http.post(this._apiUrl, invoice, this._headers);
  }

  put(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this._apiUrl}`, invoice, this._headers);
  }

  getById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this._apiUrl}/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this._apiUrl}/${id}`);
  }

  setStatusPaid(id: string): Observable<void> {
    return this.http.get<void>(`${this._apiUrl}/setStatusPaid/${id}`);
  }

  statusFiltersLookup(): Observable<InvoiceStatusFilter[]> {
    return this.http.get<any>(`${this._apiUrl}/statusesLookup`);
  }
}
