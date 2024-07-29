import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../core/services/payment-find-payor.service';
import { CustomerPaymentPayorPayload, CustomerPaymentPayorResponseEntity } from '../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../payment-documents/payment-documents.component';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-find-customer-payor',
  templateUrl: './find-customer-payor.component.html',
  styleUrl: './find-customer-payor.component.scss'
})
export class FindCustomerPayorComponent implements OnInit {
  @Input() searchTerms: CustomerPaymentPayorPayload | null = null;
  @Output() searchEvent = new EventEmitter<CustomerPaymentPayorPayload>();
  @Input() selectedPayor: CustomerPaymentPayorResponseEntity | null = null;
  @Output() selectPayorEvent = new EventEmitter<CustomerPaymentPayorResponseEntity | null>();

  isLoading = false;
  isErrored = false;
  isEmptyRes = true;

  customerGridData: CustomerPaymentPayorResponseEntity[] = [];
  customerGridView: GridDataResult = {
    data: [],
    total: 0,
  };
  customerSelectedIds: number[] = [];

  clientGridData: CustomerPaymentPayorResponseEntity[] = [];
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
    console.log('this.searchTerms', this.searchTerms)
    console.log('this.selectedPayor', this.selectedPayor)
    this.searchForm = this.fb.group({
      InvoiceNumber: [this.searchTerms?.findInvoiceNumber ?? ''],
      ClientName: [this.searchTerms?.findClientName ?? ''],
      CustomerName: [this.searchTerms?.findCustomerName ?? '']
    });

    if (this.searchTerms !== null &&
      (
        this.searchTerms!.findInvoiceNumber !== '' || 
        this.searchTerms!.findClientName !== '' ||
        this.searchTerms!.findCustomerName !== ''
      )
    ) {
      this.search(this.searchTerms);
    }
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      console.log('Form Submitted', this.searchForm.value);
      this.search({
        findInvoiceNumber: this.searchForm.get('InvoiceNumber').value,
        findClientName: this.searchForm.get('ClientName').value,
        findCustomerName: this.searchForm.get('CustomerName').value,
      });
    } else {
      console.log('Form is invalid');
    }
  }

  search(payload: CustomerPaymentPayorPayload) {
    this.searchTerms = payload;
    this.searchEvent.emit(payload);

    this.pmfps.getCustomerPayorEntities(payload)
      .then((res: IApiResponse<CustomerPaymentPayorResponseEntity[]>) => {
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

        if (this.selectedPayor !== null) {
          this.clientSelectedIds = [this.selectedPayor.payorClientId];
          this.customerSelectedIds = [this.selectedPayor.payorClientCustomerId];
          this.customerGridData = this.pmfps.filterCustomerSearchResults([this.selectedPayor.payorClientId]);
        }
      })
      .catch((error: Error) => {
        console.error(
          'FindCustomerPayorComponent ngOnInit getCustomerPayorEntities error.',
          error
        );
        this.logger.error(
          'FindCustomerPayorComponent ngOnInit getCustomerPayorEntities error.',
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

  onCustomerCheckboxChange(event: SelectionEvent) {
    let payor: CustomerPaymentPayorResponseEntity | null = null;
    if (event && event.selectedRows.length > 0) {
      payor = (event.selectedRows[0].dataItem as CustomerPaymentPayorResponseEntity);
    }
    const model = new CustomerPaymentPayorResponseEntity();
    model.payorClientId = payor.payorClientId;
    model.payorClientName = payor.payorClientName;
    model.payorClientCustomerId = payor.payorClientCustomerId;
    model.payorClientCustomerName = payor.payorClientCustomerName;

    this.selectedPayor = model;
    this.selectPayorEvent.emit(model); 
    console.log('this.selectPayorEvent.emit(payor)', model); 
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
}
