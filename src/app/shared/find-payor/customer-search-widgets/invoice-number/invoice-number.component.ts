import { Component, EventEmitter, Output } from '@angular/core';
import { CustomerPaymentPayor, InvoiceNumberSearchWidgetResponse } from '../../../../types/payment-find-payor.type';

@Component({
  selector: 'app-customer-search-widget-invoice-number',
  templateUrl: './invoice-number.component.html',
  styleUrl: './invoice-number.component.scss'
})
export class CustomerSearchWidgetInvoiceNumberComponent {
  @Output() selectClientCustomerEvent = new EventEmitter<CustomerPaymentPayor | null>();
  selectedCustomer: CustomerPaymentPayor;

  onCheckboxChangeListener(event: InvoiceNumberSearchWidgetResponse | null): void {
    if (event === null) {
      this.selectedCustomer = null;
      return;
    }

    const model = new CustomerPaymentPayor();
    model.payorClientId = event.clientId;
    model.payorClientName = event.clientName;
    model.payorClientCustomerId = event.customerId;
    model.payorClientCustomerName = event.customerName;
    
    this.selectedCustomer = model;
    this.selectClientCustomerEvent.emit(model);
  }
}
