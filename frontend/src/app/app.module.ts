import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { PageFrameComponent } from './components/layout/page-frame/page-frame.component';
import { PagesModule } from './components/pages/pages.module';
import { AuthInterceptor } from './services/auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageFrameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
