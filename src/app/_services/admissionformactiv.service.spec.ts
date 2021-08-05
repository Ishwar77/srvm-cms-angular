import { TestBed } from '@angular/core/testing';

import { AdmissionformactivService } from './admissionformactiv.service';

describe('AdmissionformactivService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmissionformactivService = TestBed.get(AdmissionformactivService);
    expect(service).toBeTruthy();
  });
});
