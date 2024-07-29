import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PaymentDetailsComponent } from './shared/payment-details/payment-details.component';
import { FindAtradiusPayorComponent } from './shared/find-payor/find-atradius-payor/find-atradius-payor.component';
import { FindCustomerPayorComponent } from './shared/find-payor/find-customer-payor/find-customer-payor.component';
import { FindClientPayorComponent } from './shared/find-payor/find-client-payor/find-client-payor.component';

const components = [
  AppComponent,
  PaymentSourcesComponent,
  WizardContainerComponent,
  PaymentDocumentsComponent,
  PaymentDetailsComponent, 
  FindAtradiusPayorComponent, 
  FindCustomerPayorComponent, 
  FindClientPayorComponent,
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
  ReactiveFormsModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...components, ...modules],
  bootstrap: [AppComponent],
})
export class AppModule {}
