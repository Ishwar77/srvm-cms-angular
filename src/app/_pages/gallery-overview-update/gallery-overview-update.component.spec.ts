import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryOverviewUpdateComponent } from './gallery-overview-update.component';

describe('GalleryOverviewUpdateComponent', () => {
  let component: GalleryOverviewUpdateComponent;
  let fixture: ComponentFixture<GalleryOverviewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryOverviewUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryOverviewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
