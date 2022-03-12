import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modals/modal.service';
import { modalsRegister } from './modals-register';
import { ModalsRegister } from './modals.types';

@Component({
  selector: 'modals-container',
  template: `
    <div *ngIf="showModal" class="modals-container">
      <modal-spinner *ngIf="isActive(modals.spinner)"></modal-spinner>
      <delete-confirmation-dialog
        *ngIf="isActive(modals.deleteConfirmation)"
      ></delete-confirmation-dialog>
      <confirmation-dialog *ngIf="isActive(modals.confirmationDialog)"></confirmation-dialog>
    </div>
  `,
  styleUrls: ['modals-container.component.scss'],
})
export class ModalsContainerComponent implements OnInit {
  private _activeModals: string[] = [];

  constructor(private service: ModalService) {}

  get showModal(): boolean {
    if (this._activeModals.length) {
      return true;
    }
    return false;
  }

  get modals(): ModalsRegister {
    return modalsRegister;
  }

  ngOnInit() {
    this.service.activeModals.subscribe((modals: string[]) => {
      this._activeModals = modals;
    });
  }

  isActive(modal: string) {
    return this._activeModals.includes(modal);
  }
}
