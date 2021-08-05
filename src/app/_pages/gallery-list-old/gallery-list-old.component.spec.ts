import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryListOldComponent } from './gallery-list-old.component';

describe('GalleryListOldComponent', () => {
  let component: GalleryListOldComponent;
  let fixture: ComponentFixture<GalleryListOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryListOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryListOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
