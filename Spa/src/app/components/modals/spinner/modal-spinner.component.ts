import { Component } from '@angular/core';

@Component({
  selector: 'modal-spinner',
  template: `
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['modal-spinner.component.scss'],
})
export class ModalSpinner {}
