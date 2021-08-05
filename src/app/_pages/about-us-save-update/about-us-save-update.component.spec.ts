import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsSaveUpdateComponent } from './about-us-save-update.component';

describe('AboutUsSaveUpdateComponent', () => {
  let component: AboutUsSaveUpdateComponent;
  let fixture: ComponentFixture<AboutUsSaveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsSaveUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsSaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
