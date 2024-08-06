import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BladeContainerComponent } from './blade-container.component';

describe('BladeContainerComponent', () => {
  let component: BladeContainerComponent;
  let fixture: ComponentFixture<BladeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BladeContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BladeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
