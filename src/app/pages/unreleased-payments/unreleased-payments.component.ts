import { Component } from '@angular/core';
import { IApiResponse, PaymentService } from '../../core/services/payment.service';
import { Payment } from '../../types/payment.type';
import { KendoNotificationService } from '../../core/services/kendo-notification-service.service';
import { LoggerService } from '../../core/services/logger.service';
import { PaymentDetails } from '../../types/payment-details.type';

@Component({
  selector: 'app-unreleased-payments',
  templateUrl: './unreleased-payments.component.html',
  styleUrl: './unreleased-payments.component.scss'
})
export class UnreleasedPaymentsComponent {
  unreleasedPayments: PaymentDetails[] = [];

  constructor(private logger: LoggerService, 
    private kns: KendoNotificationService, 
    private pms: PaymentService
  ) { }

  ngOnInit(): void {
    this.loadUnreleasedPayments();
  }

  loadUnreleasedPayments(): void {
    this.pms.getUnreleasedPaymentDetails()
      .then((res: IApiResponse<PaymentDetails[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }
        this.unreleasedPayments = res.data;
      })
      .catch((error: Error) => {
        console.error(
          'UnreleasedPaymentsComponent loadUnreleasedPayments getUnreleasedPaymentDetails error.',
          error
        );
        this.logger.error(
          'UnreleasedPaymentsComponent loadUnreleasedPayments getUnreleasedPaymentDetails error.',
          error
        );
        this.kns.show('error', 'Something went wrong while retrieving the unreleased payments.');
      });
  }
}
