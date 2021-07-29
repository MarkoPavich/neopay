import { Component } from '@angular/core';

@Component({
  selector: 'button-hero',
  template: `

  <div class="button-hero">
    <div class="add-circle">
      <img src="/assets/icon-plus.svg" alt="add.img">
    </div>
    <button>New Invoice</button>
  </div>

  `,
  styleUrls: ['./button.hero.component.scss']
})

export class ButtonHero{
  constructor() {}
}