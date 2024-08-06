import { Component, EventEmitter, Output } from '@angular/core';
import { ClientNameSearchTerms, ClientPaymentPayor, ClientCustomerSearchWidgetResponse, CustomerPaymentPayor } from '../../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../../payment-documents/payment-documents.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../../core/services/payment-find-payor.service';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-client-search-widget-client-name',
  templateUrl: './client-name.component.html',
  styleUrl: './client-name.component.scss'
})
export class ClientSearchWidgetClientNameComponent {
  @Output() selectClientEvent = new EventEmitter<ClientPaymentPayor | null>();
  selectedClient: ClientPaymentPayor;
  searchTerms: ClientNameSearchTerms;

  clientGridData: ClientCustomerSearchWidgetResponse[] = [];
  clientGridView: GridDataResult = {
    data: [],
    total: 0,
  };

  customerGridData: ClientCustomerSearchWidgetResponse[] = [];
  customerGridView: GridDataResult = {
    data: [],
    total: 0,
  };

  isLoading = false;
  isErrored = false;
  isEmptyRes = true;
  clientSelectedIds: number[] = [];
  customerSelectedIds: number[] = [];

  noRecordsMessage = noRecordsMessageConstant;

  searchForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private pms: PaymentService, 
    private pmfps: PaymentFindPayorService,
    private logger: LoggerService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      ClientName: [''],
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      console.log('Form Submitted', this.searchForm.value);
      this.search({
        findClientName: this.searchForm.get('ClientName').value,
      });
    } else {
      console.log('Form is invalid');
    }
  }

  search(payload: ClientNameSearchTerms) {
    this.searchTerms = payload;

    this.pmfps.doClientNameSearch(payload)
      .then((res: IApiResponse<ClientCustomerSearchWidgetResponse[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.clientGridData = res.data;
        this.customerGridData = res.data;
        this.isLoading = false;
        this.isErrored = false;
        this.isEmptyRes = res.data.length === 0;

        this.clientSelectedIds = [];
      })
      .catch((error: Error) => {
        console.error(
          'FindClientPayorComponent ngOnInit getClientPayorEntities error.',
          error
        );
        this.logger.error(
          'FindClientPayorComponent ngOnInit getClientPayorEntities error.',
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

  onClientCheckboxChange(event: SelectionEvent) {
    if (!event || event.selectedRows.length === 0) {
      this.selectedClient = null;
      return;
    }

    const payor: ClientCustomerSearchWidgetResponse | null = (event.selectedRows[0].dataItem as ClientCustomerSearchWidgetResponse);
    const model = new ClientPaymentPayor();
    model.payorClientId = payor.clientId;
    model.payorClientName = payor.clientName;

    this.selectedClient = model;
    console.log('this.selectedClient', model); 
  }

  onCustomerCheckboxChange(event: SelectionEvent) { }

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
