import { TestBed } from '@angular/core/testing';

import { AdditionalDocumentsService } from './additional-documents.service';

describe('AdditionalDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdditionalDocumentsService = TestBed.get(AdditionalDocumentsService);
    expect(service).toBeTruthy();
  });
});
