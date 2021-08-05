import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryOverviewDetailsComponent } from './gallery-overview-details.component';

describe('GalleryOverviewDetailsComponent', () => {
  let component: GalleryOverviewDetailsComponent;
  let fixture: ComponentFixture<GalleryOverviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryOverviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryOverviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
