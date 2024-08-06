import { TestBed } from '@angular/core/testing';

import { BladeObserverService } from './blade-observer.service';

describe('BladeObserverService', () => {
  let service: BladeObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BladeObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
