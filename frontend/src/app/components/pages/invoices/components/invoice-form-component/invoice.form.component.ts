import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormFactory } from 'src/app/services/factories/form-factory.service';
import { Invoice, InvoiceItem } from 'src/app/models/models';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice.form.component.html',
  styleUrls: ['./invoice.form.component.scss'],
})

export class InvoiceFormComponent implements OnInit {
  private _isNew: boolean = true;
  private _isActive: boolean = true;
  private _invoiceForm!: FormGroup;

  public _tmpInvoiceName: string = 'RT3080';

  constructor (
    private formBuilder: FormBuilder,
    private formFactory: FormFactory
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
    this.invoiceForm.reset();
    this._isNew = true;
    this._isActive = true;
  }

  addItem(): void{
    this.invoiceItems.push(this.formFactory.invoiceItemForm(this.formBuilder));
  }

  removeItem(index: number): void{
    this.invoiceItems.removeAt(index);
  }

  onSubmit(): void{
    const invoice: Invoice = this._invoiceForm.value;
    console.log(invoice);
  }

}