import { TestBed } from '@angular/core/testing';

import { NyTimesAPIService } from './ny-times-api.service';

describe('NyTimesAPIService', () => {
  let service: NyTimesAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NyTimesAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
