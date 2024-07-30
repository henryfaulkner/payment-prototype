import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentApplicationInvoiceGridComponent } from './payment-application-invoice-grid.component';

describe('PaymentApplicationInvoiceGridComponent', () => {
  let component: PaymentApplicationInvoiceGridComponent;
  let fixture: ComponentFixture<PaymentApplicationInvoiceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentApplicationInvoiceGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentApplicationInvoiceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
