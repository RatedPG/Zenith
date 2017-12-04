import { TestBed, inject } from '@angular/core/testing';

import { ActivityFetchServiceService } from './activity-fetch-service.service';

describe('ActivityFetchServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityFetchServiceService]
    });
  });

  it('should be created', inject([ActivityFetchServiceService], (service: ActivityFetchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
