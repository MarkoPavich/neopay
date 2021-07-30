import { Component } from '@angular/core';

@Component({
  selector: 'status-info-button',
  template: `
    
    <div class="content-container">
      <button>
        <span class="bulletpoint">•</span>
        <span class="status-span">Paid</span>
      </button>

      <img src="./assets/icon-arrow-right.svg" alt="gotoDetails.img">
    </div>

    `,
    styleUrls: ['./status.info.button.component.scss']
})

export class StatusInfoButtonComponent {}