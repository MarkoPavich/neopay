import { Component } from "@angular/core";

@Component({
  selector: 'modals-container',
  template: `
    <div *ngIf="showModal" class="modals-container">
      <modal-spinner></modal-spinner>
    </div>
  `,
  styleUrls: ['modals-container.component.scss']
})
export class ModalsContainerComponent{
  private _showModal: boolean = true;

  get showModal(): boolean{
    return this._showModal;
  }
}