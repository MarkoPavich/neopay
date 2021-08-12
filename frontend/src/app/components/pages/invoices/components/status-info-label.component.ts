import { Component } from '@angular/core';

@Component({
  selector: 'status-info-label',
  template: `
    
    <div class="content-container">
      <div class="info-label">
        <div class="bulletpoint"></div>
        <span class="status-span">Paid</span>
      </div>

      <img src="./assets/icon-arrow-right.svg" alt="gotoDetails.img">
    </div>

    `,
    styleUrls: ['./status-info-label.component.scss']
})

export class StatusInfoLabelComponent {}