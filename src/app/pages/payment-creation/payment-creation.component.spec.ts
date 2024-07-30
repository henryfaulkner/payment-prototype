import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreationComponent } from './payment-creation.component';

describe('PaymentCreationComponent', () => {
  let component: PaymentCreationComponent;
  let fixture: ComponentFixture<PaymentCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
