import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentDocumentBladeComponent } from './create-payment-document-blade.component';

describe('CreatePaymentDocumentBladeComponent', () => {
  let component: CreatePaymentDocumentBladeComponent;
  let fixture: ComponentFixture<CreatePaymentDocumentBladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePaymentDocumentBladeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePaymentDocumentBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
