import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDocumentsComponent } from './payment-documents.component';

describe('PaymentDocumentsComponent', () => {
  let component: PaymentDocumentsComponent;
  let fixture: ComponentFixture<PaymentDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
