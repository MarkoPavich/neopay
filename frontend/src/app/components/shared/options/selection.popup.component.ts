import { Component } from '@angular/core';

@Component({
  selector: 'selection-popup-menu',
  template: `

    <div class="content-container">
      <span class="span-full-width">Filter by status</span>
      <span class="span-short">Filter</span>
      <img src="/assets/icon-arrow-down.svg" alt="menu_arrow.img">
    </div>
    `,
  styleUrls: ['./selection.popup.component.scss']
})
export class SelectionPopupComponent {}