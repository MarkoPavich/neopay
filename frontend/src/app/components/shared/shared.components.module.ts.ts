import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { ButtonHero } from './buttons/button.hero.component';
import { SelectionPopupComponent } from './options/selection.popup.component';
import { InputFIeldComponent } from "./inputs/input.field.component";

@NgModule({
  declarations: [
    ButtonHero,
    SelectionPopupComponent,
    InputFIeldComponent
  ],
  exports: [
    ButtonHero,
    SelectionPopupComponent,
    InputFIeldComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedComponentsModule {}