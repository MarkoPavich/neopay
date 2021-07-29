import { NgModule } from "@angular/core";

import { ButtonHero } from './buttons/button.hero.component';
import { SelectionPopupComponent } from './options/selection.popup.component';

@NgModule({
  declarations: [
    ButtonHero,
    SelectionPopupComponent
  ],
  exports: [
    ButtonHero,
    SelectionPopupComponent
  ]
})
export class SharedComponentsModule {}