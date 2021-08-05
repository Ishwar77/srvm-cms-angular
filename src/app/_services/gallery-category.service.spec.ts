import { TestBed } from '@angular/core/testing';

import { GalleryCategoryService } from './gallery-category.service';

describe('GalleryCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalleryCategoryService = TestBed.get(GalleryCategoryService);
    expect(service).toBeTruthy();
  });
});
