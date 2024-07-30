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
import { PaymentDocumentBatch } from '../../types/payment-document-batch.type';
import { KendoNotificationService } from '../../core/services/kendo-notification-service.service';

export const noRecordsMessageConstant = 'No records found';

@Component({
  selector: 'app-payment-documents',
  templateUrl: './payment-documents.component.html',
  styleUrl: './payment-documents.component.scss',
})
export class PaymentDocumentsComponent implements OnInit {
  @Input() paymentId: number | null = null;

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
  @Output() selectEvent = new EventEmitter<PaymentDocumentBatch>();

  batchNotes = '';

  constructor(private pms: PaymentService, 
    private logger: LoggerService,
    private kns: KendoNotificationService,  
  ) { }

  ngOnInit(): void {
    this.pms
      .getPaymentDocuments(null)
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
   * Kendo selecting settings
   */

  onCheckboxChange(event: SelectionEvent) {
    if (!event?.selectedRows) {
      this.kns.show('error', 'selectedRows RowArgs could not be found.');
      this.logger.error(
        'PaymentDocumentsComponent onCheckboxChange: selectedRows RowArgs could not be found.'
      );
      return;
    }
    if (!event?.deselectedRows) {
      this.kns.show('error', 'deselectedRows RowArgs could not be found.');
      this.logger.error(
        'PaymentDocumentsComponent onCheckboxChange: deselectedRows RowArgs could not be found.'
      );
      return;
    }

    event.selectedRows.forEach((x: RowArgs) => {
      this.selectedDocuments.push(x.dataItem as PaymentDocument);
    });

    event.deselectedRows.forEach((x: RowArgs) => {
      const doc = x.dataItem as PaymentDocument;
      const index = this.selectedDocuments.findIndex(x => x.iD === doc.iD);
      if (index !== -1) {
        this.selectedDocuments.splice(index, 1);
      }
    });

    this.selectEvent.emit({
      paymentDocuments: this.selectedDocuments,
      batchNotes: this.batchNotes,
    });
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
