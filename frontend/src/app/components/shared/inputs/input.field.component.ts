import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-field',
  template: `
  
  <div [formGroup]="formGroup"class="input-field-container">
    <label *ngIf="_showLabel" [for]="name">{{label}}</label>
    <input 
      [ngClass]="{'input-centered': center}" 
      [name]="name"
      [placeholder]="placeholder" 
      [formControlName]="formControlName"
    />
  </div>

  `,
  styleUrls: ['./input.field.component.scss']
})

export class InputFIeldComponent implements OnInit {
  @Input('name') _name: string = '';
  @Input('label') _label:string = 'input field';
  @Input('placeholder') _placeholder: string = 'input field'
  @Input('showLabel') _showLabel: boolean = true;
  @Input('centered') _center: boolean = false;
  @Input('controlName') _formControlName: string = '';
  @Input('formGroup') _formGroup!: FormGroup

  constructor(private controlContainer: ControlContainer) { }

  ngOnInit() {
    this._formGroup = this.controlContainer.control as FormGroup;
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

  get center(){
    return this._center;
  }

  get formControlName(){
    return this._formControlName
  }

  get formGroup(){
    return this._formGroup;
  }

  get groupName(): string |number | null{
    return this.controlContainer.name;
  }

}
