import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCustomerPayorComponent } from './find-customer-payor.component';

describe('FindCustomerPayorComponent', () => {
  let component: FindCustomerPayorComponent;
  let fixture: ComponentFixture<FindCustomerPayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindCustomerPayorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindCustomerPayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
