import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGalleryDetailsComponent } from './dialog-gallery-details.component';

describe('DialogGalleryDetailsComponent', () => {
  let component: DialogGalleryDetailsComponent;
  let fixture: ComponentFixture<DialogGalleryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGalleryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGalleryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
