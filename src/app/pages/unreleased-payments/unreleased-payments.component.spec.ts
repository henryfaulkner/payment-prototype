import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreleasedPaymentsComponent } from './unreleased-payments.component';

describe('UnreleasedPaymentsComponent', () => {
  let component: UnreleasedPaymentsComponent;
  let fixture: ComponentFixture<UnreleasedPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnreleasedPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnreleasedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
