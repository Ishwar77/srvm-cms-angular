import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCategoryListComponent } from './gallery-category-list.component';

describe('GalleryCategoryListComponent', () => {
  let component: GalleryCategoryListComponent;
  let fixture: ComponentFixture<GalleryCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
