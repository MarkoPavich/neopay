import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  InvoiceStatus,
  PaymentTerms,
  PaymentTermsStringRep,
} from 'src/app/enums/enums';
import { SelectOption } from 'src/app/models/generic';
import { StatusFiltersResponse } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class InvoiceFormFactory {
  constructor(private formBuilder: FormBuilder) {}

  invoiceForm(): FormGroup {
    return this.formBuilder.group({
      id: '',
      status: InvoiceStatus.draft,
      billFrom: this.formBuilder.group({
        streetAddress: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postCode: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      }),
      billTo: this.formBuilder.group({
        clientName: new FormControl('', Validators.required),
        clientEmail: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        streetAddress: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postCode: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        invoiceDate: new FormControl('', Validators.required),
        dueDate: new FormControl(
          this.getPaymentTerms()[3].value,
          Validators.required
        ),
        description: new FormControl('', Validators.required),
      }),
      items: this.formBuilder.array([this.invoiceItemForm()]),
    });
  }

  invoiceItemForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      quantity: 0,
      price: 0,
    });
  }

  invoiceFiltersForm(statusFilters: StatusFiltersResponse[]): FormArray {
    const statusFiltersForm = this.formBuilder.array([]);

    for (const filter of statusFilters) {
      statusFiltersForm.push(
        this.formBuilder.group({
          name: new FormControl(filter.name),
          value: new FormControl(filter.value),
          checked: new FormControl(true),
        })
      );
    }

    return statusFiltersForm;
  }

  getPaymentTerms(): SelectOption[] {
    return [
      {
        value: PaymentTerms.Net1Day,
        text: PaymentTermsStringRep[PaymentTerms.Net1Day],
      },
      {
        value: PaymentTerms.Net7Day,
        text: PaymentTermsStringRep[PaymentTerms.Net7Day],
      },
      {
        value: PaymentTerms.Net14Day,
        text: PaymentTermsStringRep[PaymentTerms.Net14Day],
      },
      {
        value: PaymentTerms.Net30Day,
        text: PaymentTermsStringRep[PaymentTerms.Net30Day],
      },
    ];
  }
}
