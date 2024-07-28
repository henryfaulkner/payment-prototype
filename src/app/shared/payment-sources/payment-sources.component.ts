import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoggerService } from '../../core/services/logger.service';
import {
  IApiResponse,
  PaymentService,
} from '../../core/services/payment.service';
import { PaymentSource } from '../../types/payment-source.type';

@Component({
  selector: 'app-payment-sources',
  templateUrl: './payment-sources.component.html',
  styleUrl: './payment-sources.component.scss',
})
export class PaymentSourcesComponent implements OnInit {
  @Input() selectedSource: PaymentSource = { name: 'placeholder', value: -1 };
  @Output() selectEvent = new EventEmitter<PaymentSource>();

  public sources: Array<PaymentSource> = [];

  constructor(private pms: PaymentService, private logger: LoggerService) {}

  ngOnInit(): void {
    this.pms
      .getPaymentSources()
      .then((res: IApiResponse<PaymentSource[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }

        this.sources = res.data;
        this.selectedSource = res.data[0];
      })
      .catch((error: Error) => {
        console.log('getFundingHistory catch', error);
        console.error(
          'PaymentSourcesComponent ngOnInit getPaymentSources error.',
          error
        );
        this.logger.error(
          'PaymentSourcesComponent ngOnInit getPaymentSources error.',
          error
        );
      });
  }

  onSelectionChange(event: PaymentSource) {
    this.selectedSource = event;
    this.selectEvent.emit(event);
    console.log('SourcesComponent onSelectionChange event', event);
  }
}
