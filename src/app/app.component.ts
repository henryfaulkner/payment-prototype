import { Component, OnInit } from '@angular/core';
import { StepperStep } from '@progress/kendo-angular-layout';
import { PaymentDocument } from './types/payment-document.type';
import { PaymentSource } from './types/payment-source.type';
import { PaymentDetails } from './types/payment-details.type';
import { AtradiusPaymentPayorResponseEntity, ClientPaymentPayorPayload, ClientPaymentPayorResponseEntity, CustomerPaymentPayorPayload, CustomerPaymentPayorResponseEntity } from './types/payment-find-payor.type';
import { PaymentNavEvent, PaymentSources, StepIndexes } from './core/enums';
import { PaymentDocumentBatch } from './types/payment-document-batch.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}
