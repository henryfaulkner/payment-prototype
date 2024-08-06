import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, SelectionEvent } from '@progress/kendo-angular-grid';
import { InvoiceNumberSearchTerms, InvoiceNumberSearchWidgetResponse } from '../../../types/payment-find-payor.type';
import { noRecordsMessageConstant } from '../../payment-documents/payment-documents.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../core/services/payment-find-payor.service';
import { LoggerService } from '../../../core/services/logger.service';
import { KendoNotificationService } from '../../../core/services/kendo-notification-service.service';

@Component({
  selector: 'app-invoice-number-selection-grid',
  templateUrl: './invoice-number-selection-grid.component.html',
  styleUrl: './invoice-number-selection-grid.component.scss'
})
export class InvoiceNumberSelectionGridComponent implements OnInit {
  gridData: InvoiceNumberSearchWidgetResponse[] = [];
  gridView: GridDataResult = {
    data: [],
    total: 0,
  };
  isLoading = false;
  isErrored = false;
  isEmptyRes = true;
  selectedIds: number[] = [];

  noRecordsMessage = noRecordsMessageConstant;
  
  searchForm: FormGroup;
  searchTerms: InvoiceNumberSearchTerms;

  @Output() selectCheckboxEvent = new EventEmitter<InvoiceNumberSearchWidgetResponse | null>();

  constructor(private fb: FormBuilder, 
    private pms: PaymentService, 
    private pmfps: PaymentFindPayorService,
    private logger: LoggerService,
    private kns: KendoNotificationService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      InvoiceNumber: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.search({
        findInvoiceNumber: this.searchForm.get('InvoiceNumber').value,
      });
    } else {
      console.log('Form is invalid.');
      this.searchForm.markAllAsTouched();
    }
  }

  search(searchTerms: InvoiceNumberSearchTerms) {
    this.searchTerms = searchTerms;

    this.pmfps.doInvoiceNumberSearch(searchTerms)
      .then((res: IApiResponse<InvoiceNumberSearchWidgetResponse[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.gridData = res.data;
        this.isLoading = false;
        this.isErrored = false;
        this.isEmptyRes = res.data.length === 0;
        this.selectedIds = [];
      }).catch((error: Error) => {
        console.error(
          'FindClientPayorComponent ngOnInit getClientPayorEntities error.',
          error
        );
        this.logger.error(
          'FindClientPayorComponent ngOnInit getClientPayorEntities error.',
          error
        );
        this.kns.show('error', 'Error occurred loading Invoice grid.')
        this.gridData = [];
        this.isLoading = false;
        this.isErrored = true;
        this.isEmptyRes = false;
      }).finally(() => {
        this.gridView = {
          data: this.gridData.slice(this.skip, this.skip + this.pageSize),
          total: this.gridData.length,
        };
      });
  }

  onCheckboxChange(event: SelectionEvent): void {
    if (!event || event.selectedRows.length === 0) {
      this.selectCheckboxEvent.emit(null);
      return;
    }

    const selectedInvoice: InvoiceNumberSearchWidgetResponse | null = (event.selectedRows[0].dataItem as InvoiceNumberSearchWidgetResponse);
    this.selectCheckboxEvent.emit(selectedInvoice);
  }

  /**
   * Kendo Grid Settings
   */
    public type: PagerType = 'input';
    public buttonCount = 5;
    public info = true;
    public pageSizes = [2, 5, 10, 20];
    public previousNext = true;
    public position: PagerPosition = 'bottom';
    public height = 400;
    pageSize = 5;
    skip = 0;
 
   public pageChange({ skip, take }: PageChangeEvent): void {
     this.skip = skip;
     this.pageSize = take;
     this.loadGridView();
   }

   public loadGridView(): void {
    this.gridView = {
      data: this.gridData.slice(this.skip, this.skip + this.pageSize),
      total: this.gridData.length,
    };
  }
}
