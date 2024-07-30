import { TestBed } from '@angular/core/testing';

import { KendoNotificationServiceService } from './kendo-notification-service.service';

describe('KendoNotificationServiceService', () => {
  let service: KendoNotificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KendoNotificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
