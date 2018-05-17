import { TestBed, inject } from '@angular/core/testing';

import { DealertypeService } from './dealertype.service';

describe('DealertypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealertypeService]
    });
  });

  it('should be created', inject([DealertypeService], (service: DealertypeService) => {
    expect(service).toBeTruthy();
  }));
});
