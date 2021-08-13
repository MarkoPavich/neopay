import { Component } from '@angular/core';

@Component({
  selector: 'status-info-label',
  template: `
    
    <div class="info-label">
      <div class="bulletpoint"></div>
      <span class="status-span">Paid</span>
    </div>

    `,
    styleUrls: ['./status-info-label.component.scss']
})

export class StatusInfoLabelComponent {}