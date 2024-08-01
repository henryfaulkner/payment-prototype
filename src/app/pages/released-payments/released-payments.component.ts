import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../core/services/logger.service';
import { KendoNotificationService } from '../../core/services/kendo-notification-service.service';
import { IApiResponse, PaymentService } from '../../core/services/payment.service';
import { Payment } from '../../types/payment.type';
import { PaymentDetails } from '../../types/payment-details.type';

@Component({
  selector: 'app-released-payments',
  templateUrl: './released-payments.component.html',
  styleUrl: './released-payments.component.scss'
})
export class ReleasedPaymentsComponent implements OnInit {
  releasedPayments: PaymentDetails[] = [];

  constructor(private logger: LoggerService, 
    private kns: KendoNotificationService, 
    private pms: PaymentService
  ) { }

  ngOnInit(): void {
    this.loadReleasedPayments();
  }

  loadReleasedPayments(): void {
    this.pms.getReleasedPaymentDetails()
      .then((res: IApiResponse<PaymentDetails[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }
        this.releasedPayments = res.data;
      })
      .catch((error: Error) => {
        console.error(
          'ReleasedPaymentsComponent loadReleasedPayments getReleasedPaymentDetails error.',
          error
        );
        this.logger.error(
          'ReleasedPaymentsComponent loadReleasedPayments getReleasedPaymentDetails error.',
          error
        );
        this.kns.show('error', 'Something went wrong while retrieving the released payments.');
      });
  }
}
