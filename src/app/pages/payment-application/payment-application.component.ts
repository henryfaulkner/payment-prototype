import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../core/services/logger.service';
import { KendoNotificationService } from '../../core/services/kendo-notification-service.service';
import { IApiResponse, PaymentService } from '../../core/services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../types/payment.type';
import { PaymentDetails } from '../../types/payment-details.type';
import { PurchasedInvoice } from '../../types/purchased-invoice.type';

@Component({
  selector: 'app-payment-application',
  templateUrl: './payment-application.component.html',
  styleUrl: './payment-application.component.scss'
})
export class PaymentApplicationComponent implements OnInit {
  paymentId: number;
  paymentDetails: PaymentDetails;
  availableInvoices: PurchasedInvoice[] = [];
  appliedInvoices: PurchasedInvoice[] = []; 

  constructor(private logger: LoggerService,
    private kns: KendoNotificationService,
    private pms: PaymentService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const subscription = this.route.queryParams.subscribe((params) => {
      this.paymentId = params['paymentId'];
    });
    subscription.unsubscribe();

    this.loadPaymentDetails(this.paymentId);
    this.loadAvailableInvoices(this.paymentId);
    this.loadAppliedInvoices(this.paymentId);
  }

  loadPaymentDetails(paymentId: number) {
    this.pms.getPaymentDetails(this.paymentId)
      .then((res: IApiResponse<PaymentDetails>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }
        this.paymentDetails = res.data;
      })
      .catch((error: Error) => {
        console.error(
          'PaymentApplicationComponent ngOnInit getPaymentDetails error.',
          error
        );
        this.logger.error(
          'PaymentApplicationComponent ngOnInit getPaymentDetails error.',
          error
        );
        this.kns.show('error', 'Something went wrong while retrieving the payment details.');
      });
  }

  loadAvailableInvoices(paymentId: number) {
    this.pms.getAvailableInvoices(this.paymentId)
      .then((res: IApiResponse<PurchasedInvoice[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }
        this.availableInvoices = res.data;
      })
      .catch((error: Error) => {
        console.error(
          'PaymentApplicationComponent ngOnInit getPaymentDetails error.',
          error
        );
        this.logger.error(
          'PaymentApplicationComponent ngOnInit getPaymentDetails error.',
          error
        );
        this.kns.show('error', 'Something went wrong while retrieving the payment details.');
      });
  }

  loadAppliedInvoices(paymentId: number) {
    this.pms.getAppliedInvoices(this.paymentId)
      .then((res: IApiResponse<PurchasedInvoice[]>) => {
        if (!res.isSuccessful) {
          throw new Error(res.message, res.exception);
        }
        this.appliedInvoices = res.data;
      })
      .catch((error: Error) => {
        console.error(
          'PaymentApplicationComponent ngOnInit getPaymentDetails error.',
          error
        );
        this.logger.error(
          'PaymentApplicationComponent ngOnInit getPaymentDetails error.',
          error
        );
        this.kns.show('error', 'Something went wrong while retrieving the payment details.');
      });
  }
}
