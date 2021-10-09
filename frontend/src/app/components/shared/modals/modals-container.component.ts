import { Component } from "@angular/core";

@Component({
  selector: 'modals-container',
  template: `
    <div *ngIf="showModal" class="modals-container">
      
    </div>
  `,
  styleUrls: ['modals-container.component.scss']
})
export class ModalsContainerComponent{
  private _showModal: boolean = false;

  get showModal(): boolean{
    return this._showModal;
  }
}