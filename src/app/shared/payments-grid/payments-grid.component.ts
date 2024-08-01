import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Payment } from '../../types/payment.type';
import { GridDataResult, PageChangeEvent, PagerPosition, PagerType } from '@progress/kendo-angular-grid';
import { noRecordsMessageConstant } from '../payment-documents/payment-documents.component';
import { PaymentDetails } from '../../types/payment-details.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-grid',
  templateUrl: './payments-grid.component.html',
  styleUrl: './payments-grid.component.scss'
})
export class PaymentsGridComponent implements OnInit, OnChanges {
  @Input() canEdit: boolean = false;

  @Input() gridData: PaymentDetails[];
  gridView: GridDataResult = {
    data: [],
    total: 0,
  };
  isLoading = true;
  isErrored = false;
  isEmptyRes = false;
  noRecordsMessage = noRecordsMessageConstant;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridData']) {
      this.isLoading = false;
      this.isErrored = false;
      this.isEmptyRes = this.gridData.length === 0; 
      this.loadGridView();
    }
  }

  navigateToPaymentApplication(paymentId: number) {
    this.router.navigate(["/payment-application"], {
      queryParams: { paymentId: paymentId },
    });
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
