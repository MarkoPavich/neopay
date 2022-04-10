import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { INPUT_ERRORS } from 'src/app/constants/error-messages';

@Component({
  selector: 'input-field',
  template: `
    <div [formGroup]="formGroup" class="input-field-container">
      <div class="label-container">
        <label *ngIf="_showLabel" [for]="name">{{ label }}</label>
        <p class="error-message" [ngClass]="{ active: showError }">
          {{ errorMessage }}
        </p>
      </div>
      <input
        *ngIf="formControlName"
        [ngClass]="{ 'input-centered': center }"
        [name]="name"
        [placeholder]="placeholder"
        [formControlName]="formControlName"
        [type]="type"
      />
      <input
        *ngIf="!formControlName"
        [ngClass]="{ 'input-centered': center }"
        [name]="name"
        [placeholder]="placeholder"
        [value]="value"
        [type]="type"
      />
    </div>
  `,
  styleUrls: ['./input-field.component.scss'],
})
export class InputFIeldComponent implements OnInit {
  @Input('name') _name: string = '';
  @Input('label') _label: string = 'input field';
  @Input('placeholder') _placeholder: string = 'input field';
  @Input('showLabel') _showLabel: boolean = true;
  @Input('centered') _center: boolean = false;
  @Input('controlName') _formControlName: string = '';
  @Input('formGroup') _formGroup!: FormGroup;
  @Input('value') _value: string = '';
  @Input('type') _type: string = 'text';
  @Input('errorMessage') _errorMessage: string = ''

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    this._formGroup = this.controlContainer.control as FormGroup;
  }

  get name() {
    return this._name;
  }

  get showError(): boolean {
    const control = this._formGroup.get(this._formControlName) as FormGroup;
    return control.invalid && control.dirty;
  }

  get label() {
    return this._label;
  }

  get placeholder() {
    return this._placeholder;
  }

  get center() {
    return this._center;
  }

  get formControlName() {
    return this._formControlName;
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  get value(): string {
    return this._value;
  }

  get type(): string {
    return this._type;
  }

  get errorMessage(): string {
    if(this._errorMessage)
      return this._errorMessage;
    
    if(this._type === 'email')
      return INPUT_ERRORS.email;
    
    return INPUT_ERRORS.required;
  }
}
