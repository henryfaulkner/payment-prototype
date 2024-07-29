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
export class AppComponent implements OnInit {
  public isLinear = true;
  public currentStep: StepIndexes = StepIndexes.Documents;
  public steps: Array<StepperStep> = [];
  public stepIndexes = StepIndexes;
  public paymentSources = PaymentSources;
  public lastNavEvent: PaymentNavEvent = PaymentNavEvent.None;

  public paymentDocumentBatch: PaymentDocumentBatch = {
    paymentDocuments: [],
    batchNotes: '',
  };

  public paymentSource: PaymentSource = {
    name: 'Pick the Payment Source',
    value: -1,
  }; // stepper validation - sources

  public paymentPayorCustomer: CustomerPaymentPayorResponseEntity | null = null;
  public paymentPayorClient: ClientPaymentPayorResponseEntity | null = null;
  public paymentPayorAtradius: AtradiusPaymentPayorResponseEntity | null = null;
  public paymentPayorCustomerSearchTerms: CustomerPaymentPayorPayload | null = null;
  public paymentPayorClientSearchTerms: ClientPaymentPayorPayload | null = null;

  public paymentDetails: PaymentDetails | null = null;

  ngOnInit(): void {
    this.steps = this.updateStepperSettings();
  }

  updateStepperSettings(): Array<StepperStep> {
    return [
      {
        label: 'Link Documents',
        validate: true,
        isValid: this.isPaymentDocumentApplied(),
      },
      {
        label: 'Define Source',
        validate: true,
        isValid: this.isPaymentSourceApplied(),
        disabled: !this.isPaymentDocumentApplied(),
      },
      {
        label: 'Find Payor',
        validate: true,
        isValid: this.isPaymentPayorApplied(),
        disabled: !this.isPaymentSourceApplied(),
      },
      {
        label: 'Detail Payment',
        validate: true,
        isValid: this.isPaymentDetailsApplied(),
        disabled: !this.isPaymentPayorApplied(),
      },
      { 
        label: 'Apply Payment',
        disabled: !this.isPaymentDetailsApplied(),
      },
    ];
  }

  // on step click, currentStep changes automatically to match
  // new visual step bc of [()] notation
  public currentStepChange(e: number): void {
    this.steps = this.updateStepperSettings();
  }

  stepBack() {
    const newStep: StepIndexes = this.currentStep - 1;
    if (!this.isStepIndexAllowed(newStep)) {
      return;
    }
    this.currentStep = newStep;
    this.lastNavEvent = PaymentNavEvent.Back;

    this.steps = this.updateStepperSettings();
  }

  stepForward() {
    const newStep: StepIndexes = this.currentStep + 1;
    if (!this.isStepIndexAllowed(newStep)) {
      return;
    }
    this.currentStep = newStep;
    this.lastNavEvent = PaymentNavEvent.Forward;

    this.steps = this.updateStepperSettings();
  }

  private isStepIndexAllowed(stepIndex: StepIndexes): boolean {
    return !this.steps[stepIndex].disabled;
  }

  applyPaymentDocuments(paymentDocumentBatch: PaymentDocumentBatch): void {
    this.paymentDocumentBatch = paymentDocumentBatch;

    this.steps = this.updateStepperSettings();
  }

  isPaymentDocumentApplied(): boolean {
    return this.paymentDocumentBatch.paymentDocuments.length > 0;
  }

  applyPaymentSource(paymentSource: PaymentSource): void {
    this.paymentPayorCustomer = null;
    this.paymentPayorClient = null;
    this.paymentPayorAtradius = null;

    this.paymentSource = paymentSource;

    this.steps = this.updateStepperSettings();
  }

  isPaymentSourceApplied(): boolean {
    return this.paymentSource.value >= 0;
  }

  applyPaymentPayor(
    paymentPayor: CustomerPaymentPayorResponseEntity 
    | ClientPaymentPayorResponseEntity 
    | AtradiusPaymentPayorResponseEntity): void {
      if (paymentPayor instanceof CustomerPaymentPayorResponseEntity) {
        console.log("paymentPayor instanceof CustomerPaymentPayorResponseEntity");
        this.paymentPayorCustomer = paymentPayor;
        this.steps = this.updateStepperSettings();
      }

      if (paymentPayor instanceof ClientPaymentPayorResponseEntity) {
        console.log("paymentPayor instanceof ClientPaymentPayorResponseEntity");
        this.paymentPayorClient = paymentPayor;
        this.steps = this.updateStepperSettings();
      }

      if (paymentPayor instanceof AtradiusPaymentPayorResponseEntity) {
        console.log("paymentPayor instanceof AtradiusPaymentPayorResponseEntity");
        this.paymentPayorAtradius = paymentPayor;
        this.steps = this.updateStepperSettings();
        this.stepForward();
      }
  }

  isPaymentPayorApplied(): boolean {
    let result = this.paymentPayorCustomer !== null;
    result = result || this.paymentPayorClient !== null;
    result = result || this.paymentPayorAtradius !== null;
    return result; 
  }

  paymentPayorCustomerSearch(payload: CustomerPaymentPayorPayload): void {
    this.paymentPayorCustomerSearchTerms = payload;
  }  

  paymentPayorClientSearch(payload: ClientPaymentPayorPayload): void {
    this.paymentPayorClientSearchTerms = payload;
  }  

  applyPaymentDetails(paymentDetails: PaymentDetails): void {
    this.paymentDetails = paymentDetails;

    this.steps = this.updateStepperSettings();
  }

  isPaymentDetailsApplied(): boolean {
    return false;
  }
}
