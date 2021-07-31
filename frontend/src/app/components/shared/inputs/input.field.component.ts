import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-field',
  template: `
  
  <div class="input-field-container">
    <label [for]="name">{{label}}</label>
    <input 
      [name]="name"
      [placeholder]="placeholder" 
      type="text"
      >
  </div>

  `,
  styleUrls: ['./input.field.component.scss']
})

export class InputFIeldComponent {
  @Input('name') _name: string = '';
  @Input('label') _label:string = 'input field';
  @Input('placeholder') _placeholder: string = 'input field'

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


}

