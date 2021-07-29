import { Component } from '@angular/core';

@Component({
  selector: 'selection-popup-menu',
  template: `

    <div class="content-container">
      <span>Filter by status</span>
      <img src="/assets/icon-arrow-down.svg" alt="menu_arrow.img">
    </div>
    `,
  styleUrls: ['./selection.popup.component.scss']
})
export class SelectionPopupComponent {}