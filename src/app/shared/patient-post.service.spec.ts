import { TestBed, inject } from '@angular/core/testing';

import { PatientPostService } from './patient-post.service';

describe('PatientPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientPostService]
    });
  });

  it('should be created', inject([PatientPostService], (service: PatientPostService) => {
    expect(service).toBeTruthy();
  }));
});
