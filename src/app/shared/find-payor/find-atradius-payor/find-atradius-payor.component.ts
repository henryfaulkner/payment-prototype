import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IApiResponse } from '../../../core/services/payment.service';
import { LoggerService } from '../../../core/services/logger.service';
import { AtradiusPaymentPayorResponseEntity, AtradiusPaymnetPayorPayload } from '../../../types/payment-find-payor.type';
import { PaymentFindPayorService } from '../../../core/services/payment-find-payor.service';
import { PaymentNavEvent } from '../../../core/enums';

@Component({
  selector: 'app-find-atradius-payor',
  templateUrl: './find-atradius-payor.component.html',
  styleUrl: './find-atradius-payor.component.scss'
})
export class FindAtradiusPayorComponent implements OnInit {
  @Input() selectedPayor: AtradiusPaymentPayorResponseEntity | null = null;
  @Input() originNavEvent: PaymentNavEvent;
  @Output() selectPayorEvent = new EventEmitter<AtradiusPaymentPayorResponseEntity | null>();
  @Output() stepBackEvent = new EventEmitter<void>();

  constructor(private pmfps: PaymentFindPayorService , private logger: LoggerService) { }

  ngOnInit(): void {
    if (this.originNavEvent === PaymentNavEvent.Forward) {
      this.pmfps.getAtradiusPayorEntity({} as AtradiusPaymnetPayorPayload)
        .then((res: IApiResponse<AtradiusPaymentPayorResponseEntity>) => {
          this.selectedPayor = res.data;
        })
        .catch((error: Error) => {
          console.error(
            'PayorAtradiusComponent ngOnInit getAtradiusPayorEntity error.',
            error
          );
          this.logger.error(
            'PayorAtradiusComponent ngOnInit getAtradiusPayorEntity error.',
            error
          );
        })
        .finally(() => {
          if (this.selectedPayor) {
            this.selectPayorEvent.emit(this.selectedPayor)
          } 
        });
    } else {
      this.selectPayorEvent.emit(null);
      this.stepBackEvent.emit();
    }
  }
}
