import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-hero',
  template: `

  <div (click)="onClick()" class="button-hero">
    <div class="add-circle">
      <img src="/assets/icon-plus.svg" alt="add.img">
    </div>
    <button>New Invoice</button>
  </div>

  `,
  styleUrls: ['./button.hero.component.scss']
})

export class ButtonHero{
  @Output() clickEmitter = new EventEmitter<void>();

  constructor() {}

  onClick(){
    this.clickEmitter.emit();
  }
}