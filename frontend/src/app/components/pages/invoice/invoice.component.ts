import { Component, OnInit } from "@angular/core";
import { Invoice, InvoiceItem } from "src/app/models/models";
import { InvoiceService } from "src/app/services/http/invoice.service";
import { URLS } from "src/app/constants/routing-constants";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  private _invoice!: Invoice;

  constructor(
    private service: InvoiceService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    const invoiceId: string = this.route.snapshot.params.id;
    new Observable(observer => {
      this.service.getById(invoiceId).then((invoice: Invoice) =>{
        observer.next(invoice);
        observer.complete();
      })
    }).subscribe((invoice) => {
      this._invoice = invoice as Invoice;
    })
  }

  get homeUrl(): string{
    return URLS.home;
  }

  get haveModel(): boolean{
    return this._invoice ? true : false;
  }

  get invoiceId():string{
    return this._invoice.id
  }

  get billFrom(){
    return this._invoice.billFrom;
  }

  get billTo(){ 
    return this._invoice.billTo;
  }

  get invoiceItems(): InvoiceItem[]{
    return this._invoice.items;
  }

  get totalSum(): string{
    let total = 0;

    for(const item of this.invoiceItems){
      total = total + item.price * item.quantity;
    }

    return `${total.toFixed(2)}`
  }

  getItemSum(index: number): string{
    const item: InvoiceItem = this.invoiceItems[index];
    const sum = item.price * item.quantity;
    return `${sum.toFixed(2)}` // TODO - add better rounding
  }
}