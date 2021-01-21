import { TestBed } from '@angular/core/testing';

import { BoookingService } from './boooking.service';

describe('BoookingService', () => {
  let service: BoookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
