import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog.component';
import { DeleteConfirmationDialogComponent } from './dialog/delete-confirmation-dialog.component';
import { ModalsContainerComponent } from './modals-container.component';
import { ModalSpinner } from './spinner/modal-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ModalsContainerComponent,
    ModalSpinner,
    DeleteConfirmationDialogComponent,
    ConfirmationDialogComponent,
  ],
  exports: [
    ModalsContainerComponent,
    ModalSpinner,
    DeleteConfirmationDialogComponent,
    ConfirmationDialogComponent,
  ],
})
export class ModalsModule {}
