import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class FormFactory{

  invoiceForm(formBuilder: FormBuilder): FormGroup{
    return formBuilder.group({
      id: '',
      billFrom: formBuilder.group({
        streetAddress: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postCode: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required)
      }),
      billTo: formBuilder.group({
        clientName: new FormControl('', Validators.required),
        clientEmail: new FormControl('', [Validators.required, Validators.email]),
        streetAddress: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postCode: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        invoiceDate:new FormControl('', Validators.required),
        dueDate: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      }),
      items: formBuilder.array([this.invoiceItemForm(formBuilder)])
    })
  }

  invoiceItemForm(formBuilder: FormBuilder): FormGroup{
    return formBuilder.group({
      name: new FormControl('', [Validators.required]),
      quantity: 0,
      price: 0,
    })
  }

}