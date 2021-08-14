import { Component, OnInit } from "@angular/core";
import { Invoice } from "src/app/models/models";
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
    const invoiceId: string = this.route.snapshot.params.id
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

  async getInvoice(id: string){
    this._invoice = await this.service.getById(id);
  }

  get invoiceId():string{
    console.log("id", this._invoice.id)
    return this._invoice.id
  }
}