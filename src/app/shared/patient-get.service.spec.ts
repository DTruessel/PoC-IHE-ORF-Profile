import { TestBed, inject } from '@angular/core/testing';

import { PatientGetService } from './patient-get.service';

describe('PatientGetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientGetService]
    });
  });

  it('should be created', inject([PatientGetService], (service: PatientGetService) => {
    expect(service).toBeTruthy();
  }));
});
