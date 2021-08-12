import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormFactory } from 'src/app/services/factories/form-factory.service';
import { Invoice, InvoiceItem } from 'src/app/models/models';
import { InvoiceService } from 'src/app/services/http/invoice.service';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice.form.component.html',
  styleUrls: ['./invoice.form.component.scss'],
})

export class InvoiceFormComponent implements OnInit {
  private _isNew: boolean = true;
  private _isActive: boolean = false;
  private _invoiceForm!: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private formFactory: FormFactory,
    private service: InvoiceService
    ) {}

  ngOnInit(){
    this._invoiceForm = this.formFactory.invoiceForm(this.formBuilder)
  }

  get isNew(): boolean{
    return this._isNew;
  }

  get isActive(): boolean{
    return this._isActive;
  }

  get invoiceForm(): FormGroup{
    return this._invoiceForm;
  }

  get invoiceItems(): FormArray{
    return this._invoiceForm.get('items') as FormArray;
  }

  get invoiceId(): string{
    return this._invoiceForm.get('id')?.value;
  }

  getFormGroupAtIndex(index: number): FormGroup{
    return this.invoiceItems.at(index) as FormGroup
  }

  getTotal(index: number): string{
    const item: InvoiceItem = this.invoiceItems.at(index).value;
    const total = item.price * item.quantity;
    return `${total.toFixed(2)}` // TODO - add better rounding
  }

  closeForm(): void{
    this._isActive = false;
    this._invoiceForm.reset();
  }

  openNewForm(): void{
    this._invoiceForm.reset();
    this._isNew = true;
    this._isActive = true;
  }

  openEditForm(invoice: Invoice){
    this._invoiceForm.reset();

    this._invoiceForm.controls['id'].setValue(invoice.id);
    this._invoiceForm.controls['billFrom'].setValue(invoice.billFrom);
    this._invoiceForm.controls['billTo'].setValue(invoice.billTo);
    this._invoiceForm.controls['items'].setValue(invoice.items);

    this._isNew = false;
    this._isActive = true;

    invoice.id = "TestTEst"
  }

  addItem(): void{
    this.invoiceItems.push(this.formFactory.invoiceItemForm(this.formBuilder));
  }

  removeItem(index: number): void{
    this.invoiceItems.removeAt(index);
  }

  async onSubmit(): Promise<void>{
    const invoice: Invoice = this._invoiceForm.value;
    await this.service.post(invoice);
    this.closeForm();
  }

}