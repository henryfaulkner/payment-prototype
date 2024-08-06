import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentDocument } from '../../../types/payment-document.type';

@Component({
  selector: 'app-create-payment-document-blade',
  templateUrl: './create-payment-document-blade.component.html',
  styleUrl: './create-payment-document-blade.component.scss'
})
export class CreatePaymentDocumentBladeComponent {
  @Input() title = 'Payment Document';
  @Input() bladeHashId: string;
  @Input() bladeDocument: PaymentDocument | null;
  @Output() saveEvent = new EventEmitter<boolean>();

  save() {
    // send request to backend to create or modify document

    // emit state change to parent component
    // if state change is required of UI (such as a create action), emit true
    // else if no UI update is required, emit false
    this.saveEvent.emit(true);
  }
}
