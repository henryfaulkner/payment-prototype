import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNumberSelectionGridComponent } from './invoice-number-selection-grid.component';

describe('InvoiceNumberSelectionGridComponent', () => {
  let component: InvoiceNumberSelectionGridComponent;
  let fixture: ComponentFixture<InvoiceNumberSelectionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceNumberSelectionGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceNumberSelectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
