import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class FormFactory{

  invoiceForm(formBuilder: FormBuilder): FormGroup{
    return formBuilder.group({
      id: '',
      billFrom: formBuilder.group({
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
      }),
      billTo: formBuilder.group({
        clientName: '',
        clientEmail: '',
        streetAddress: '',
        city: '',
        postCode: '',
        country: '',
        invoiceDate: '',
        dueDate: '',
        description: ''
      }),
      items: formBuilder.array([this.invoiceItemForm(formBuilder)])
    })
  }

  invoiceItemForm(formBuilder: FormBuilder): FormGroup{
    return formBuilder.group({
      name: '',
      quantity: 0,
      price: 0,
    })
  }

}