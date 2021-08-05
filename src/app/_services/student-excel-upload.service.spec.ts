import { TestBed } from '@angular/core/testing';

import { StudentExcelUploadService } from './student-excel-upload.service';

describe('StudentExcelUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentExcelUploadService = TestBed.get(StudentExcelUploadService);
    expect(service).toBeTruthy();
  });
});
