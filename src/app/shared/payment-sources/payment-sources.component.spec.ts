import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSourcesComponent } from './payment-sources.component';

describe('PaymentSourcesComponent', () => {
  let component: PaymentSourcesComponent;
  let fixture: ComponentFixture<PaymentSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentSourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
