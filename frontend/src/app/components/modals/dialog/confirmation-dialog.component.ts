import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modals/modal.service';

@Component({
  selector: 'confirmation-dialog',
  template: ` <div class="modal-container">
    <div class="text-container">
      <h1>Confirm Deletion</h1>
      <span>Are you sure you want to {{ predicate }} ?</span>
    </div>
    <div class="controls-container">
      <button (click)="onCancel()" class="button button-aux">Cancel</button>
      <button (click)="onConfirm()" class="button button-primary">Confirm</button>
    </div>
  </div>`,
  styleUrls: ['dialog-component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  private _predicate: string = '';

  constructor(private modalService: ModalService) {}

  get predicate(): string {
    return this._predicate;
  }

  ngOnInit(): void {
    this._predicate = this.modalService.context;
  }

  onConfirm() {
    this.modalService.selection = true.toString();
  }

  onCancel() {
    this.modalService.selection = false.toString();
  }
}
