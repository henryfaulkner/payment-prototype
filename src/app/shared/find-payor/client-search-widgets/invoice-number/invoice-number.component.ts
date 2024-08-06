import { Component, EventEmitter, Output } from '@angular/core';
import { ClientPaymentPayor, InvoiceNumberSearchTerms, InvoiceNumberSearchWidgetResponse } from '../../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../../payment-documents/payment-documents.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../../core/services/payment-find-payor.service';
import { LoggerService } from '../../../../core/services/logger.service';
import { KendoNotificationService } from '../../../../core/services/kendo-notification-service.service';

@Component({
  selector: 'app-client-search-widget-invoice-number',
  templateUrl: './invoice-number.component.html',
  styleUrl: './invoice-number.component.scss'
})
export class ClientSearchWidgetInvoiceNumberComponent {
  @Output() selectClientEvent = new EventEmitter<ClientPaymentPayor | null>();
  selectedClient: ClientPaymentPayor;

  onCheckboxChangeListener(event: InvoiceNumberSearchWidgetResponse | null): void {
    if (event === null) {
      this.selectedClient = null;
      return;
    }

    const model = new ClientPaymentPayor();
    model.payorClientId = event.clientId;
    model.payorClientName = event.clientName;
    
    this.selectedClient = model;
    this.selectClientEvent.emit(model);
  }
}
