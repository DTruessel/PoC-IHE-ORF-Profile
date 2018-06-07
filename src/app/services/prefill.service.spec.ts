import { TestBed, inject } from '@angular/core/testing';

import { PrefillService } from './prefill.service';

describe('PrefillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrefillService]
    });
  });

  it('should be created', inject([PrefillService], (service: PrefillService) => {
    expect(service).toBeTruthy();
  }));
});
