import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { InvoicesComponent } from './components/pages/invoices/invoices.component';
import { PageFrameComponent } from './components/layout/page-frame/page-frame.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvoicesComponent,
    PageFrameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
