import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/models/generic';

@Component({
  selector: 'dropdown-field',
  template: `

  <div [formGroup]="formGroup" class="dropdown-container">
    <label *ngIf="_showLabel" [for]="name">{{label}}</label>
    <div class="dropdown-input-container" tabindex="0">
      <select [name]="name" [formControlName]="formControlName">
      </select>
      <input
        [placeholder]="placeholder"
        disabled
        [value]="fieldText"
      />
      <ul class="select-options">
        <ng-container *ngFor="let option of selectOptions; let i=index">
          <li (click)="onSelect(option)" ><span>{{option.text}}</span></li>
        </ng-container>
      </ul>
    </div>
  </div>

  `,
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit{
  @Input('name') _name: string = '';
  @Input('label') _label:string = 'dropdown field';
  @Input('placeholder') _placeholder: string = 'dropdown field'
  @Input('showLabel') _showLabel: boolean = true;
  @Input('centered') _center: boolean = false;
  @Input('controlName') _formControlName: string = '';
  @Input('formGroup') _formGroup: FormGroup | null = null;
  @Input('options') _options: SelectOption[] = [];
  @Input('preselectText') _preselectText: string | null = null;

  private _fieldText: string | number = '';

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    if(this._preselectText){
      this._fieldText = this._preselectText;
    }
  }

  get name(){
    return this._name;
  }

  get label(){
    return this._label;
  }

  get placeholder(){
    return this._placeholder;
  }

  get formControlName(){
    return this._formControlName
  }

  get formGroup(){
    if(this._formGroup)
      return this._formGroup;

    return this.controlContainer.control as FormGroup
  }

  get groupName(): string |number | null{
    return this.controlContainer.name;
  }

  get fieldText(){
    return this._fieldText;
  }

  get selectOptions(): SelectOption[] {
    return this._options;
  }

  onSelect(option: SelectOption){
    const doc = <any>document;

    this._fieldText = option.text;
    this.controlContainer.control?.get(this._formControlName)?.patchValue(option.value);

    doc.activeElement.blur();
  }

}

