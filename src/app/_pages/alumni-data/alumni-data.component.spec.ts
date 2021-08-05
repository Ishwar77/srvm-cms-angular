import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniDataComponent } from './alumni-data.component';

describe('AlumniDataComponent', () => {
  let component: AlumniDataComponent;
  let fixture: ComponentFixture<AlumniDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumniDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
