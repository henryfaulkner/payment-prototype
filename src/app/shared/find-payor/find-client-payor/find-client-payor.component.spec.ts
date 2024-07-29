import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindClientPayorComponent } from './find-client-payor.component';

describe('FindClientPayorComponent', () => {
  let component: FindClientPayorComponent;
  let fixture: ComponentFixture<FindClientPayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindClientPayorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindClientPayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
