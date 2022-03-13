import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/models/generic';

@Component({
  selector: 'datepicker-dropdown-field',
  template: `
    <div
      (click)="onShowCalendar()"
      [formGroup]="formGroup"
      class="dropdown-container"
    >
      <label *ngIf="_showLabel" [for]="name">{{ label }}</label>
      <div class="dropdown-input-container" tabindex="0">
        <select [name]="name" [formControlName]="formControlName"></select>
        <input [placeholder]="placeholder" disabled [value]="fieldText" />

        <div
          (click)="onCalendarContainerClick($event)"
          class="select-options-container"
        >
          <header class="datepicker-header">
            <div (click)="onMoveMonthBackward()" class="date-range-selector">
              <img
                src="assets/icon-arrow-left.svg"
                alt="move-date-range-negative-month.ico"
              />
            </div>
            <span>{{ dateRangeString }}</span>
            <div (click)="onMoveMonthForward()" class="date-range-selector">
              <img
                src="assets/icon-arrow-right.svg"
                alt="move-date-range-positive-month.ico"
              />
            </div>
          </header>
          <ul class="date-options">
            <li
              (click)="onSelect(date)"
              *ngFor="let date of dateArray"
              [ngClass]="{
                'date-disabled': dateIsNextMonth(date),
                'date-current': isCurrentDate(date),
                'selected': isSelected(date)
              }"
            >
              {{ date.getDate() }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./datepicker-dropdown.component.scss'],
})
export class DatepickerDropdownComponent implements OnInit, OnChanges {
  @Input('name') _name: string = '';
  @Input('label') _label: string = 'dropdown field';
  @Input('placeholder') _placeholder: string = 'dropdown field';
  @Input('showLabel') _showLabel: boolean = true;
  @Input('centered') _center: boolean = false;
  @Input('controlName') _formControlName: string = '';
  @Input('formGroup') _formGroup: FormGroup | null = null;
  @Input('options') _options: SelectOption[] = [];
  @Input('preselectDate') _preselectDate: Date | null = null;

  private _fieldText: string = '';
  private _dateArray: Date[] = [];

  constructor(private controlContainer: ControlContainer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this._preselectDate) {
      this.setFieldText(this._preselectDate);
    }
  }

  ngOnInit() {
    this.populateDateArray();
  }

  get dateArray(): Date[] {
    return this._dateArray;
  }

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  get placeholder() {
    return this._placeholder;
  }

  get formControlName() {
    return this._formControlName;
  }

  get formGroup() {
    if (this._formGroup) return this._formGroup;

    return this.controlContainer.control as FormGroup;
  }

  get groupName(): string | number | null {
    return this.controlContainer.name;
  }

  get dateRangeString(): string {
    return this._dateArray[0].toLocaleString('UTC', {
      month: 'short',
      year: 'numeric',
    });
  }

  get fieldText() {
    return this._fieldText;
  }

  get selectOptions(): SelectOption[] {
    return this._options;
  }

  onShowCalendar() {
    this.populateDateArray();
  }

  dateIsNextMonth(date: Date): boolean {
    return this._dateArray[0].getMonth() !== date.getMonth();
  }

  isCurrentDate(date: Date): boolean {
    const currentDate = new Date();
    return (
      currentDate.toLocaleDateString('UTC') === date.toLocaleDateString('UTC')
    );
  }

  isSelected(date: Date): boolean {
    const selectedDate = this.controlContainer.control?.get(
      this._formControlName
    )?.value as Date;

    if(!selectedDate){
      return false;
    }

    if(!(selectedDate instanceof Date)){
      throw TypeError('Datepicker form control must contain a null/undefined or a valid Date object.')
    }

    return (
      selectedDate.toLocaleDateString('UTC') === date.toLocaleDateString('UTC')
    );

  }

  onMoveMonthForward(): void {
    const referenceDate = this._dateArray[0];
    const dateRange = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() + 1
    );

    this.populateDateArray(dateRange);
  }

  onMoveMonthBackward(): void {
    const referenceDate = this._dateArray[0];
    const dateRange = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth() - 1
    );

    this.populateDateArray(dateRange);
  }

  populateDateArray(rangeDate: Date = new Date()): void {
    const dateArray: Date[] = [];
    for (let i = 1; i < 36; i++) {
      dateArray.push(
        new Date(rangeDate.getFullYear(), rangeDate.getMonth(), i)
      );
    }

    this._dateArray = dateArray;
  }

  onCalendarContainerClick($event: MouseEvent) {
    $event.stopPropagation();
  }

  setFieldText(date: Date): void {
    this._fieldText = date.toLocaleString('default', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  onSelect(date: Date) {
    const doc = <any>document;
    this.controlContainer.control?.get(this._formControlName)?.patchValue(date);

    this.setFieldText(date);

    doc.activeElement.blur();
  }
}
