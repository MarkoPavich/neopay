import { Component, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { InvoiceStatusFilter } from 'src/app/models/models';

@Component({
  selector: 'selection-popup-menu',
  template: `
    <div class="content-container" tabindex="0">
      <span class="span-full-width">Filter by status</span>
      <span class="span-short">Filter</span>
      <img src="/assets/icon-arrow-down.svg" alt="menu_arrow.img" />

      <div class="options-container" (click)="onInnerContainerClick($event)">
        <ul>
          <li *ngFor="let filter of statusFiltersForm.controls; let i = index">
            <div
              [formGroup]="getFilterGroup(i)"
              class="checkbox-option"
              (click)="onSelect(filter)"
            >
              <div
                class="checkbox-icon"
                [ngClass]="getIsChecked(filter) ? 'checkbox-checked' : ''"
              >
                <img
                  *ngIf="getIsChecked(filter)"
                  [src]="'assets/icon-check.svg'"
                  alt=""
                />
              </div>
              <label for="">{{ getFilterName(filter) }}</label>
            </div>
          </li>
          <li *ngIf="statusFiltersForm.controls.length === 0">
            <span>No invoices are available</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./selection.popup.component.scss'],
})
export class SelectionPopupComponent {
  @Input('statusFiltersForm') _filtersForm: FormArray = new FormArray([]);

  getIsChecked(filterGroup: AbstractControl): boolean {
    const filter = filterGroup.value as InvoiceStatusFilter;
    return filter.checked;
  }

  getFilterName(filterGroup: AbstractControl): string {
    const filter = filterGroup.value as InvoiceStatusFilter;
    return filter.name;
  }

  get statusFiltersForm(): FormArray {
    return this._filtersForm;
  }

  getFilterGroup(index: number): FormGroup {
    return this._filtersForm.at(index) as FormGroup;
  }

  onInnerContainerClick($event: MouseEvent): void {
    $event.stopPropagation();
  }

  onSelect(filterGroup: AbstractControl) {
    const control = filterGroup as FormGroup;
    const value: Boolean = control.get('checked')?.value
    control.get('checked')?.setValue(!value);
  }
}
