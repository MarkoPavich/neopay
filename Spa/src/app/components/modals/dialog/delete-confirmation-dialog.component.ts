import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modals/modal.service';

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <div class="modal-container">
      <div class="text-container">
        <h1>Confirm Deletion</h1>
        <span
          >Are you sure you want to delete invoice #{{ invoiceId }}? This action
          cannot be undone</span
        >
      </div>
      <div class="controls-container">
        <button (click)="onCancel()" class="button button-aux">Cancel</button>
        <button (click)="onConfirm()" class="button button-danger">Delete</button>
      </div>
    </div>
  `,
  styleUrls: ['dialog-component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  private _invoiceId!: string;

  constructor(private modalService: ModalService) {}

  ngOnInit(){
    this._invoiceId = this.modalService.context;
  }

  get invoiceId(): string {
    return this._invoiceId;
  }

  onConfirm() {
    this.modalService.selection = true.toString();
  }

  onCancel() {
    this.modalService.selection = false.toString();
  }
}
