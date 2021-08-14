import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { PageFrameComponent } from './components/layout/page-frame/page-frame.component';

import { InvoicesListModule } from './components/pages/invoices-list/invoices-list.module';
import { InvoiceModule } from './components/pages/invoice/invoice.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageFrameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InvoicesListModule,
    InvoiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
