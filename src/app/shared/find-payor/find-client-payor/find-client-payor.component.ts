import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientPaymentPayorPayload, ClientPaymentPayorResponseEntity } from '../../../types/payment-find-payor.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType, SelectionEvent } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../../payment-documents/payment-documents.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IApiResponse, PaymentService } from '../../../core/services/payment.service';
import { PaymentFindPayorService } from '../../../core/services/payment-find-payor.service';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-find-client-payor',
  templateUrl: './find-client-payor.component.html',
  styleUrl: './find-client-payor.component.scss'
})
export class FindClientPayorComponent {
  @Input() searchTerms: ClientPaymentPayorPayload | null = null;
  @Output() searchEvent = new EventEmitter<ClientPaymentPayorPayload>();
  @Input() selectedPayor: ClientPaymentPayorResponseEntity | null = null;
  @Output() selectPayorEvent = new EventEmitter<ClientPaymentPayorResponseEntity | null>();

  gridData: ClientPaymentPayorResponseEntity[] = [];
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
    });

    if (this.searchTerms !== null &&
      (
        this.searchTerms!.findInvoiceNumber !== '' || 
        this.searchTerms!.findClientName !== '' 
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
      });
    } else {
      console.log('Form is invalid');
    }
  }

  search(payload: ClientPaymentPayorPayload) {
    this.searchTerms = payload;
    this.searchEvent.emit(payload);

    this.pmfps.getClientPayorEntities(payload)
      .then((res: IApiResponse<ClientPaymentPayorResponseEntity[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.gridData = res.data;
        this.isLoading = false;
        this.isErrored = false;
        this.isEmptyRes = res.data.length === 0;

        this.selectedIds = [];

        if (this.selectedPayor !== null) {
          this.selectedIds = [this.selectedPayor.payorClientId];
        }
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
        this.gridData = [];
        this.isLoading = false;
        this.isErrored = true;
        this.isEmptyRes = false;
      })
      .finally(() => {
        this.loadGridView();
      });
  }

  onCheckboxChange(event: SelectionEvent) {
    if (!event || event.selectedRows.length === 0) {
      this.selectedPayor = null;
      this.selectPayorEvent.emit(null);
      return;
    }

    const payor: ClientPaymentPayorResponseEntity | null = (event.selectedRows[0].dataItem as ClientPaymentPayorResponseEntity);
    const model = new ClientPaymentPayorResponseEntity();
    model.payorClientId = payor.payorClientId;
    model.payorClientName = payor.payorClientName;

    this.selectedPayor = model;
    this.selectPayorEvent.emit(model); 
    console.log('this.selectPayorEvent.emit(payor)', model); 
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
   public skip = 0;
 
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
