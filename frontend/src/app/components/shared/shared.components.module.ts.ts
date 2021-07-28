import { NgModule } from "@angular/core";

import { ButtonHero } from './buttons/button.hero.component';

@NgModule({
  declarations: [
    ButtonHero
  ],
  exports: [
    ButtonHero
  ]
})
export class SharedComponentsModule {}