import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonHero } from './buttons/button.hero.component';
import { SelectionPopupComponent } from './options/selection.popup.component';
import { InputFIeldComponent } from './inputs/input-field.component';
import { StatusInfoLabelComponent } from './misc/status-info-label.component';
import { InvoiceFormComponent } from './invoice-form-component/invoice.form.component';
import { DropdownComponent } from './inputs/dropdown.component';
import { DatepickerDropdownComponent } from './inputs/datepicker-dropdown.component';

@NgModule({
  declarations: [
    ButtonHero,
    SelectionPopupComponent,
    InputFIeldComponent,
    StatusInfoLabelComponent,
    InvoiceFormComponent,
    DropdownComponent,
    DatepickerDropdownComponent
  ],
  exports: [
    ButtonHero,
    SelectionPopupComponent,
    InputFIeldComponent,
    StatusInfoLabelComponent,
    InvoiceFormComponent,
    DropdownComponent,
    DatepickerDropdownComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SharedComponentsModule {}
