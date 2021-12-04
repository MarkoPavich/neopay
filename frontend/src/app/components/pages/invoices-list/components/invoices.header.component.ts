import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'invoices-header-component',
  templateUrl: './invoices.header.component.html',
  styleUrls: ['./invoices.header.component.scss'],
})
export class InvoicesHeaderComponent {
  @Input('invoicesNum') _invoicesNum: number = 0;
  @Input('statusFiltersForm') _statusFiltersForm: FormArray = new FormArray([]);
  @Output('onClick') _clickEmitter = new EventEmitter<void>();

  constructor() {}

  get invoicesNum(): number {
    return this._invoicesNum;
  }

  get statusFiltersForm(): FormArray {
    return this._statusFiltersForm;
  }

  onAddNew() {
    this._clickEmitter.emit();
  }
}
