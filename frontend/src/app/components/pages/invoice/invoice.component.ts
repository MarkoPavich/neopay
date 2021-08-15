import { Component, OnInit, ViewChild } from "@angular/core";
import { Invoice, InvoiceItem } from "src/app/models/models";
import { InvoiceService } from "src/app/services/http/invoice.service";
import { URLS } from "src/app/constants/routing-constants";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { InvoiceFormComponent } from "../../shared/invoice-form-component/invoice.form.component";

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @ViewChild(InvoiceFormComponent) _invoiceForm!: InvoiceFormComponent;
  
  private _invoice!: Invoice;

  constructor(
    private service: InvoiceService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.loadInvoice();
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

  loadInvoice(){
    const invoiceId: string = this.route.snapshot.params.id;
    new Observable<Invoice>(observer => {
      this.service.getById(invoiceId).then((invoice: Invoice) =>{
        observer.next(invoice);
        observer.complete();
      })
    }).subscribe((invoice) => {
      this._invoice = invoice as Invoice;
    })
  }

  getItemSum(index: number): string{
    const item: InvoiceItem = this.invoiceItems[index];
    const sum = item.price * item.quantity;
    return `${sum.toFixed(2)}` // TODO - add better rounding
  }

  handleOnEdit(){
    this._invoiceForm.openEditForm(this._invoice);
  }

  handleOnDelete(){
    new Observable<void>(observer => {
      this.service.delete(this._invoice.id).then(() =>{
        observer.next();
        observer.complete();
      })
    }).subscribe(() => {
      this.router.navigate([URLS.home]);
    })
  }
}