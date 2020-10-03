import { TestBed } from '@angular/core/testing';

import { BrokerRequestsService } from './broker-requests.service';

describe('BrokerRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrokerRequestsService = TestBed.get(BrokerRequestsService);
    expect(service).toBeTruthy();
  });
});
