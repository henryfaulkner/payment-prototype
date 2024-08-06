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
import { PaymentCreationComponent } from './pages/payment-creation/payment-creation.component';
import { PaymentApplicationComponent } from './pages/payment-application/payment-application.component';
import { PaymentDocumentUploadComponent } from './pages/payment-document-upload/payment-document-upload.component';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ReleasedPaymentsComponent } from './pages/released-payments/released-payments.component';
import { UnreleasedPaymentsComponent } from './pages/unreleased-payments/unreleased-payments.component';
import { PaymentApplicationInvoiceGridComponent } from './shared/payment-application-invoice-grid/payment-application-invoice-grid.component';
import { PaymentsGridComponent } from './shared/payments-grid/payments-grid.component';
import { CreatePaymentDocumentBladeComponent } from './shared/blades/create-payment-document-blade/create-payment-document-blade.component';
import { BladeContainerComponent } from './shared/blade-container/blade-container.component';
import { ModifyPaymentDocumentBladeComponent } from './shared/blades/modify-payment-document-blade/modify-payment-document-blade.component';
import { CustomerSearchWidgetCustomerNameComponent } from './shared/find-payor/customer-search-widgets/customer-name/customer-name.component';
import { ClientSearchWidgetClientNameComponent } from './shared/find-payor/client-search-widgets/client-name/client-name.component';
import { ClientSearchWidgetInvoiceNumberComponent } from './shared/find-payor/client-search-widgets/invoice-number/invoice-number.component';
import { InvoiceNumberSelectionGridComponent } from './shared/find-payor/invoice-number-selection-grid/invoice-number-selection-grid.component';
import { CustomerSearchWidgetInvoiceNumberComponent } from './shared/find-payor/customer-search-widgets/invoice-number/invoice-number.component';

const components = [
  AppComponent,
  PaymentSourcesComponent,
  WizardContainerComponent,
  PaymentDocumentsComponent,
  PaymentDetailsComponent, 
  FindAtradiusPayorComponent, 
  FindCustomerPayorComponent, 
  FindClientPayorComponent,
  PaymentCreationComponent, 
  PaymentApplicationComponent, 
  PaymentDocumentUploadComponent, 
  ReleasedPaymentsComponent, 
  UnreleasedPaymentsComponent, 
  PaymentApplicationInvoiceGridComponent, 
  PaymentsGridComponent, 
  CreatePaymentDocumentBladeComponent, 
  BladeContainerComponent, 
  ModifyPaymentDocumentBladeComponent, 
  CustomerSearchWidgetCustomerNameComponent,
  ClientSearchWidgetClientNameComponent,
  ClientSearchWidgetInvoiceNumberComponent,
  CustomerSearchWidgetInvoiceNumberComponent,
  InvoiceNumberSelectionGridComponent
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
  providers: [...components, ...modules, NotificationService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
