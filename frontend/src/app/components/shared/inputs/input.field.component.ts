import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-field',
  template: `
  
  <div class="input-field-container">
    <label *ngIf="_showLabel" [for]="name">{{label}}</label>
    <input [ngClass]="{'input-centered': center}" 
      [name]="name"
      [placeholder]="placeholder" 
      [type]="type"
      >
  </div>

  `,
  styleUrls: ['./input.field.component.scss']
})

export class InputFIeldComponent {
  @Input('name') _name: string = '';
  @Input('label') _label:string = 'input field';
  @Input('placeholder') _placeholder: string = 'input field'
  @Input('showLabel') _showLabel: boolean = true;
  @Input('type') _type: string = 'text';
  @Input('centered') _center: boolean = false;

  constructor() { }

  get name(){
    return this._name;
  }

  get label(){
    return this._label;
  }

  get placeholder(){
    return this._placeholder;
  }

  get type(){
    return this._type;
  }

  get center(){
    return this._center;
  }


}

