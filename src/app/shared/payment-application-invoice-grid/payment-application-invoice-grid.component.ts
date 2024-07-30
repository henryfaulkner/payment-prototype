import { Component, Input, OnInit } from '@angular/core';
import { PurchasedInvoice } from '../../types/purchased-invoice.type';
import { noRecordsMessageConstant } from '../payment-documents/payment-documents.component';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-payment-application-invoice-grid',
  templateUrl: './payment-application-invoice-grid.component.html',
  styleUrl: './payment-application-invoice-grid.component.scss'
})
export class PaymentApplicationInvoiceGridComponent implements OnInit {
  @Input() gridData: PurchasedInvoice[];
  gridView: GridDataResult = {
    data: [],
    total: 0,
  };
  isLoading = true;
  isErrored = false;
  isEmptyRes = false;
  noRecordsMessage = noRecordsMessageConstant;

  ngOnInit(): void {
    this.isLoading = false;
    this.isErrored = false;
    this.isEmptyRes = this.gridData.length === 0; 
    this.loadGridView();
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
