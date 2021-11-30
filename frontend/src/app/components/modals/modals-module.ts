import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteConfirmationDialogComponent } from './dialog/delete-confirmation-dialog.component';
import { ModalsContainerComponent } from './modals-container.component';
import { ModalSpinner } from './spinner/modal-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalsContainerComponent, ModalSpinner, DeleteConfirmationDialogComponent],
  exports: [ModalsContainerComponent, ModalSpinner, DeleteConfirmationDialogComponent],
})
export class ModalsModule {}
