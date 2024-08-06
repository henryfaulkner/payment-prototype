import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPaymentDocumentBladeComponent } from './modify-payment-document-blade.component';

describe('ModifyPaymentDocumentBladeComponent', () => {
  let component: ModifyPaymentDocumentBladeComponent;
  let fixture: ComponentFixture<ModifyPaymentDocumentBladeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyPaymentDocumentBladeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPaymentDocumentBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
