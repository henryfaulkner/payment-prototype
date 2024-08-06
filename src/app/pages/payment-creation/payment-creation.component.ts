import { Component } from '@angular/core';
import { AtradiusPaymentPayorResponseEntity, ClientPaymentPayorPayload, ClientPaymentPayorResponseEntity, CustomerPaymentPayorPayload, CustomerPaymentPayorResponseEntity } from '../../types/payment-find-payor.type';
import { PaymentDetails } from '../../types/payment-details.type';
import { PaymentSource } from '../../types/payment-source.type';
import { PaymentDocumentBatch } from '../../types/payment-document-batch.type';
import { PaymentNavEvent, PaymentSources, StepIndexes } from '../../core/enums';
import { StepperStep } from '@progress/kendo-angular-layout';
import { LoggerService } from '../../core/services/logger.service';
import { KendoNotificationService } from '../../core/services/kendo-notification-service.service';
import { IApiResponse, PaymentService } from '../../core/services/payment.service';
import { Payment } from '../../types/payment.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-creation',
  templateUrl: './payment-creation.component.html',
  styleUrl: './payment-creation.component.scss'
})
export class PaymentCreationComponent {
  public isLinear = true;
  public currentStep: StepIndexes = StepIndexes.Documents;
  public steps: Array<StepperStep> = [];
  public stepIndexes = StepIndexes;
  public paymentSources = PaymentSources;
  public lastNavEvent: PaymentNavEvent = PaymentNavEvent.None;

  public paymentDocumentBatch: PaymentDocumentBatch = {
    paymentDocuments: [],
  };
  batchNotes = '';

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

  constructor(private logger: LoggerService, 
    private kns: KendoNotificationService, 
    private pms: PaymentService,
    private router: Router,
  ) { }

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
      // { 
      //   label: 'Apply Payment',
      //   disabled: !this.isPaymentDetailsApplied(),
      // },
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
      } else if (paymentPayor instanceof ClientPaymentPayorResponseEntity) {
        console.log("paymentPayor instanceof ClientPaymentPayorResponseEntity");
        this.paymentPayorClient = paymentPayor;
        this.steps = this.updateStepperSettings();
      } else if (paymentPayor instanceof AtradiusPaymentPayorResponseEntity) {
        console.log("paymentPayor instanceof AtradiusPaymentPayorResponseEntity");
        this.paymentPayorAtradius = paymentPayor;
        this.steps = this.updateStepperSettings();
        this.stepForward();
      } else {
        console.log('Remove PaymentPayor');
        this.paymentPayorCustomer = null;
        this.paymentPayorClient = null;
        this.paymentPayorAtradius = null;
        this.steps = this.updateStepperSettings();
        console.log('this.steps', this.steps);
      }
  }

  isPaymentPayorApplied(): boolean {
    let result = this.paymentPayorCustomer !== null;
    result = result || this.paymentPayorClient !== null;
    result = result || this.paymentPayorAtradius !== null;
    console.log('isPaymentPayorApplied()', result);
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

  createPayment() {
    console.log('Call createPayment');
    const payload: Payment = this.constructPaymentPayload();
    this.pms.createPayment(payload)
      .then((res: IApiResponse<boolean>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.kns.show('success', 'The payment was created successfully!');

        this.router.navigate(['/payment-application']);
      })
      .catch((error: Error) => {
        console.error(
          'PaymentCreationComponent createPayment createPayment error.',
          error
        );
        this.logger.error(
          'PaymentCreationComponent createPayment createPayment error.',
          error
        );
        this.kns.show('error', 'Something went wrong while creating the payment.');
      });
  }

  private constructPaymentPayload(): Payment {
    return {
      iD: -1,
      paymentSourceID: null,
      clientID: this.getClientId(),
      paymentNumber: this.paymentDetails.checkNumber,
      paymentDate: new Date(),
      paymentAmount: this.paymentDetails.checkAmount,
      paymentStatusID: null,
      paymentMethodID: this.paymentDetails.paymentMethodId,
      balance: this.paymentDetails.checkAmount,
      reversalDate: null,
      reversalReasonID: null,
      clientCustomerID: this.getClientCustomerId(),
      notes: this.batchNotes,
      sourceFundingTransactionID: null,
      transactionKey: null,
    };
  } 

  private getClientId(): number | null {
    if (this.paymentPayorCustomer !== null) return this.paymentPayorCustomer.payorClientId;
    if (this.paymentPayorClient !== null) return this.paymentPayorClient.payorClientId;
    if (this.paymentPayorAtradius !== null) return this.paymentPayorAtradius.payorClientId;
    return null;
  }

  private getClientCustomerId(): number | null {
    if (this.paymentPayorCustomer !== null) return this.paymentPayorCustomer.payorClientCustomerId;
    return null;
  }
}
