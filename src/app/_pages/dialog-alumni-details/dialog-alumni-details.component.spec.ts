import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlumniDetailsComponent } from './dialog-alumni-details.component';

describe('DialogAlumniDetailsComponent', () => {
  let component: DialogAlumniDetailsComponent;
  let fixture: ComponentFixture<DialogAlumniDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlumniDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlumniDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
