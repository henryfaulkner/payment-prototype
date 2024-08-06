import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientPaymentPayor } from '../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../payment-documents/payment-documents.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../core/services/payment-find-payor.service';
import { LoggerService } from '../../../core/services/logger.service';

type Dropdown = {
  label: string;
  value: ClientSearchWidgets;
};

enum ClientSearchWidgets {
  ClientName = 0,
  InvoiceNumber = 1,
};

@Component({
  selector: 'app-find-client-payor',
  templateUrl: './find-client-payor.component.html',
  styleUrl: './find-client-payor.component.scss'
})
export class FindClientPayorComponent {
  @Output() selectPayorEvent = new EventEmitter<ClientPaymentPayor | null>();

  selectedDropdownOption: Dropdown;
  dropdownOptions: Dropdown[] = [];
  widgets = ClientSearchWidgets;

  ngOnInit(): void {
    this.dropdownOptions = this.populateSearchWidgetDropdown();
    if (this.dropdownOptions.length > 0) {
      this.selectedDropdownOption = this.dropdownOptions[0];
    }
  }

  populateSearchWidgetDropdown(): Dropdown[] {
    return [
      {
        label: 'Client name',
        value: ClientSearchWidgets.ClientName,
      },
      {
        label: 'Invoice number',
        value: ClientSearchWidgets.InvoiceNumber,
      },
    ];
  }

  selectClientEventListener(event: ClientPaymentPayor) {
    this.selectPayorEvent.emit(event);
  } 
}
