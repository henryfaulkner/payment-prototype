import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentDetails } from '../../types/payment-details.type';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent {
  @Input() model: PaymentDetails = this.getEmptyModel();
  @Input() canCreate: boolean = false;
  @Output() applyPaymentDetailsEvent = new EventEmitter<PaymentDetails>();
  @Output() createPaymentEvent = new EventEmitter<void>();

  create() {
    this.applyPaymentDetailsEvent.emit(this.model);
    this.createPaymentEvent.emit();
  }

  private getEmptyModel(): PaymentDetails {
    return {
      customerName: '',
      customerFullAddress: '',
      clientName: '',
      clientFullAddress: '',
      
      paymentMethodId: -1,
      checkNumber: '',
      checkDate: new Date(),
      checkAmount: 0.0,
      payor: '',
      payerRefId: -1,

      bankNumber: '',
      bankBranch: '',

      payment: null,
    };
  }
}
