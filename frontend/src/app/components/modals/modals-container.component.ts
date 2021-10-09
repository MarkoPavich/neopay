import { Component } from '@angular/core';
import { modals } from './modals.constants';
import { ModalsRegister } from './modals.types';

@Component({
  selector: 'modals-container',
  template: `
    <div *ngIf="showModal" class="modals-container">
      <modal-spinner *ngIf="isActive(modals.spinner)"></modal-spinner>
    </div>
  `,
  styleUrls: ['modals-container.component.scss'],
})
export class ModalsContainerComponent {
  private _activeModals: string[] = [];

  get showModal(): boolean {
    if (this._activeModals.length) {
      return true;
    }
    return false;
  }

  get modals(): ModalsRegister {
    return modals;
  }

  isActive(modal: string) {
    return modal in this._activeModals;
  }
}
