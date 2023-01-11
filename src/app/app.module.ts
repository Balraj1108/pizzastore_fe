import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './core/layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
