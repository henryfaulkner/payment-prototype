import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedPaymentsComponent } from './released-payments.component';

describe('ReleasedPaymentsComponent', () => {
  let component: ReleasedPaymentsComponent;
  let fixture: ComponentFixture<ReleasedPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleasedPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReleasedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
