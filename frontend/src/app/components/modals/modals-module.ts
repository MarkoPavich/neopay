import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalsContainerComponent } from './modals-container.component';
import { ModalSpinner } from './spinner/modal-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalsContainerComponent, ModalSpinner],
  exports: [ModalsContainerComponent, ModalSpinner],
})
export class ModalsModule {}
