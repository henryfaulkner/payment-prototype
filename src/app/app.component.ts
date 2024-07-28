import { Component, OnInit } from '@angular/core';
import { StepperStep } from '@progress/kendo-angular-layout';
import { PaymentDocument } from './types/payment-document.type';
import { PaymentSource } from './types/payment-source.type';

enum StepIndexes {
  Documents = 0,
  Sources = 1,
  Details = 2,
  Application = 3,
}

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

  public paymentDocuments: PaymentDocument[] = [];

  public paymentSource: PaymentSource = {
    name: 'Pick the Payment Source',
    value: -1,
  }; // stepper validation - sources

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
        label: 'Detail Payment',
        disabled: !this.isPaymentSourceApplied(),
      },
      { label: 'Apply Payment' },
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

    this.steps = this.updateStepperSettings();
  }

  stepForward() {
    const newStep: StepIndexes = this.currentStep + 1;
    if (!this.isStepIndexAllowed(newStep)) {
      return;
    }
    this.currentStep = newStep;

    this.steps = this.updateStepperSettings();
  }

  private isStepIndexAllowed(stepIndex: StepIndexes): boolean {
    return !this.steps[stepIndex].disabled;
  }

  applyPaymentDocuments(paymentDocuments: PaymentDocument[]): void {
    this.paymentDocuments = paymentDocuments;

    this.steps = this.updateStepperSettings();
  }

  isPaymentDocumentApplied(): boolean {
    return this.paymentDocuments.length > 0;
  }

  applyPaymentSource(paymentSource: PaymentSource): void {
    this.paymentSource = paymentSource;

    this.steps = this.updateStepperSettings();
  }

  isPaymentSourceApplied(): boolean {
    return this.paymentSource.value >= 0;
  }
}
