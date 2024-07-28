import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  GridDataResult,
  PageChangeEvent,
  PagerPosition,
  PagerType,
  RowArgs,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { LoggerService } from '../../core/services/logger.service';
import {
  IApiResponse,
  PaymentService,
} from '../../core/services/payment.service';
import { PaymentDocument } from '../../types/payment-document.type';

const noRecordsMessageConstant = 'No records found';

@Component({
  selector: 'app-payment-documents',
  templateUrl: './payment-documents.component.html',
  styleUrl: './payment-documents.component.scss',
})
export class PaymentDocumentsComponent implements OnInit {
  gridData: PaymentDocument[] = [];
  gridView: GridDataResult = {
    data: [],
    total: 0,
  };
  isLoading = true;
  isErrored = false;
  isEmptyRes = false;
  noRecordsMessage = noRecordsMessageConstant;

  selectedDocumentIds: number[] = [];
  @Input() selectedDocuments: PaymentDocument[] = [];
  @Output() selectEvent = new EventEmitter<PaymentDocument[]>();

  constructor(private pms: PaymentService, private logger: LoggerService) {}

  ngOnInit(): void {
    this.pms
      .getPaymentDocuments()
      .then((res: IApiResponse<PaymentDocument[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.gridData = res.data;
        this.isLoading = false;
        this.isErrored = false;
        this.isEmptyRes = res.data.length === 0;
        this.selectedDocumentIds = this.mapSelectedKeys(this.selectedDocuments);
      })
      .catch((error: Error) => {
        console.error(
          'PaymentDocumentsComponent ngOnInit getPaymentDocuments error.',
          error
        );
        this.logger.error(
          'PaymentDocumentsComponent ngOnInit getPaymentDocuments error.',
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

  /**
   * Kendo sorting settings
   */

  onCheckboxChange(event: SelectionEvent) {
    if (!event?.selectedRows) {
      //this.kns.show('error', 'selectedRows RowArgs could not be found.');
      this.logger.error(
        'PaymentDocumentsComponent onCheckboxChange: selectedRows RowArgs could not be found.'
      );
      return;
    }

    const documents: PaymentDocument[] = event.selectedRows.map(
      (x: RowArgs) => x.dataItem as PaymentDocument
    );
    console.log('selected documents,', documents);
    this.selectedDocuments = documents;
    this.selectEvent.emit(documents);
  }

  mapSelectedKeys(selectedDocs: PaymentDocument[]): number[] {
    return selectedDocs.map((x) => x.iD);
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
