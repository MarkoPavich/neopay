import { NgModule } from "@angular/core";

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
  ]
})
export class SharedComponentsModule {}