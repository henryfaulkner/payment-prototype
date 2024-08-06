import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../core/services/payment-find-payor.service';
import { CustomerNameSearchTerms, CustomerPaymentPayor } from '../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../payment-documents/payment-documents.component';
import { LoggerService } from '../../../core/services/logger.service';
import { IDropdownOption } from '../../../core/interfaces/dropdown-option.interface';

type Dropdown = {
  label: string;
  value: CustomerSearchWidgets;
};

enum CustomerSearchWidgets {
  CustomerName = 0,
  InvoiceNumber = 1,
};

@Component({
  selector: 'app-find-customer-payor',
  templateUrl: './find-customer-payor.component.html',
  styleUrl: './find-customer-payor.component.scss'
})
export class FindCustomerPayorComponent implements OnInit {
  @Output() selectPayorEvent = new EventEmitter<CustomerPaymentPayor | null>();

  selectedDropdownOption: Dropdown;
  dropdownOptions: Dropdown[] = [];
  widgets = CustomerSearchWidgets;

  ngOnInit(): void {
    this.dropdownOptions = this.populateSearchWidgetDropdown();
    if (this.dropdownOptions.length > 0) {
      this.selectedDropdownOption = this.dropdownOptions[0];
    }
  }

  populateSearchWidgetDropdown(): Dropdown[] {
    return [
      {
        label: 'Customer name',
        value: CustomerSearchWidgets.CustomerName,
      },
      {
        label: 'Invoice number',
        value: CustomerSearchWidgets.InvoiceNumber,
      },
    ];
  }

  selectClientCustomerEventListener(event: CustomerPaymentPayor) {
    this.selectPayorEvent.emit(event);
  }
}
