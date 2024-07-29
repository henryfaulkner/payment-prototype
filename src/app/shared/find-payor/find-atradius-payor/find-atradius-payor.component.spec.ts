import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAtradiusPayorComponent } from './find-atradius-payor.component';

describe('FindAtradiusPayorComponent', () => {
  let component: FindAtradiusPayorComponent;
  let fixture: ComponentFixture<FindAtradiusPayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindAtradiusPayorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindAtradiusPayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
