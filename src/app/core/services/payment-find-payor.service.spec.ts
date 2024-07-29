import { TestBed } from '@angular/core/testing';

import { PaymentFindPayorService } from './payment-find-payor.service';

describe('PaymentFindPayorService', () => {
  let service: PaymentFindPayorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentFindPayorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
