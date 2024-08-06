import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientCustomerSearchWidgetResponse, CustomerNameSearchTerms, CustomerPaymentPayor } from '../../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../../payment-documents/payment-documents.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../../core/services/payment-find-payor.service';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-customer-search-widget-customer-name',
  templateUrl: './customer-name.component.html',
  styleUrl: './customer-name.component.scss'
})
export class CustomerSearchWidgetCustomerNameComponent {
  @Output() selectClientCustomerEvent = new EventEmitter<CustomerPaymentPayor | null>();
  selectedClientCustomer: CustomerPaymentPayor; 
  searchTerms: CustomerNameSearchTerms;

  isLoading = false;
  isErrored = false;
  isEmptyRes = true;

  customerGridData: ClientCustomerSearchWidgetResponse[] = [];
  customerGridView: GridDataResult = {
    data: [],
    total: 0,
  };
  customerSelectedIds: number[] = [];

  clientGridData: ClientCustomerSearchWidgetResponse[] = [];
  clientGridView: GridDataResult = {
    data: [],
    total: 0,
  };
  clientSelectedIds: number[] = [];

  noRecordsMessage = noRecordsMessageConstant;

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private pms: PaymentService, 
    private pmfps: PaymentFindPayorService,
    private logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      CustomerName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onCustomerCheckboxChange(event: SelectionEvent) {
    if (!event || event.selectedRows.length === 0) {
      this.selectedClientCustomer = null; 
      return;
    }

    const payor: ClientCustomerSearchWidgetResponse | null = (event.selectedRows[0].dataItem as ClientCustomerSearchWidgetResponse);
    const model = new CustomerPaymentPayor();
    model.payorClientId = payor.clientId;
    model.payorClientName = payor.clientName;
    model.payorClientCustomerId = payor.clientCustomerId;
    model.payorClientCustomerName = payor.clientCustomerName;

    this.selectedClientCustomer = model;
    console.log('onCustomerCheckboxChange', model); 
  }

  onClientCheckboxChange(event: SelectionEvent) {
    this.customerGridData = this.pmfps.filterCustomerSearchResults(this.clientSelectedIds);
    this.loadCustomerGridView();
  }

  /**
   * Kendo paging settings
   */
  public type: PagerType = 'input';
  public buttonCount = 5;
  public info = true;
  public pageSizes = [2, 5, 10, 20];
  public previousNext = true;
  public position: PagerPosition = 'bottom';
  public height = 400;

  public pageSize = 5;
  public customerSkip = 0;
  public clientSkip = 0;

  public customerPageChange({ skip, take }: PageChangeEvent): void {
    this.customerSkip = skip;
    this.pageSize = take;
    this.loadCustomerGridView();
  }

  public clientPageChange({ skip, take }: PageChangeEvent): void {
    this.customerSkip = skip;
    this.pageSize = take;
    this.loadClientGridView();
  }

  public loadCustomerGridView(): void {
    this.customerGridView = {
      data: this.customerGridData.slice(this.customerSkip, this.customerSkip + this.pageSize),
      total: this.customerGridData.length,
    };
  }

  public loadClientGridView(): void {
    this.clientGridView = {
      data: this.clientGridData.slice(this.clientSkip, this.clientSkip + this.pageSize),
      total: this.clientGridData.length,
    };
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      console.log('Form Submitted', this.searchForm.value);
      this.search({
        findCustomerName: this.searchForm.get('CustomerName').value,
      });
    } else {
      console.log('Form is invalid');
      this.searchForm.markAllAsTouched();
    }
  }

  search(payload: CustomerNameSearchTerms) {
    this.searchTerms = payload;

    this.pmfps.doCustomerNameSearch(payload)
      .then((res: IApiResponse<ClientCustomerSearchWidgetResponse[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.customerGridData = res.data;
        this.clientGridData = res.data;
        this.isLoading = false;
        this.isErrored = false;
        this.isEmptyRes = res.data.length === 0;

        this.clientSelectedIds = [];
        this.customerSelectedIds = [];

        if (this.selectedClientCustomer) {
          this.clientSelectedIds = [this.selectedClientCustomer.payorClientId];
          this.customerSelectedIds = [this.selectedClientCustomer.payorClientCustomerId];
          this.customerGridData = this.pmfps.filterCustomerSearchResults([this.selectedClientCustomer.payorClientId]);
        }
      })
      .catch((error: Error) => {
        console.error(
          'CustomerNameComponent ngOnInit getCustomerPayorEntities error.',
          error
        );
        this.logger.error(
          'CustomerNameComponent ngOnInit getCustomerPayorEntities error.',
          error
        );
        this.clientGridData = [];
        this.customerGridData = [];
        this.isLoading = false;
        this.isErrored = true;
        this.isEmptyRes = false;
      })
      .finally(() => {
        this.loadClientGridView();
        this.loadCustomerGridView();
      });
  }
}
