import { TestBed, inject } from '@angular/core/testing';

import { UserGetService } from './user-get.service';

describe('UserGetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGetService]
    });
  });

  it('should be created', inject([UserGetService], (service: UserGetService) => {
    expect(service).toBeTruthy();
  }));
});
