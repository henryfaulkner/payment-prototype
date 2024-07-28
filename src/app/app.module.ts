import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { GridModule } from '@progress/kendo-angular-grid';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentDocumentsComponent } from './shared/payment-documents/payment-documents.component';
import { PaymentSourcesComponent } from './shared/payment-sources/payment-sources.component';
import { WizardContainerComponent } from './shared/wizard-container/wizard-container.component';

const components = [
  AppComponent,
  PaymentSourcesComponent,
  WizardContainerComponent,
  PaymentDocumentsComponent,
];

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  LayoutModule,
  FormsModule,
  LabelModule,
  InputsModule,
  DropDownsModule,
  GridModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...components, ...modules],
  bootstrap: [AppComponent],
})
export class AppModule {}
