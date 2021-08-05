import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsOverviewComponent } from './student-details-overview.component';

describe('StudentDetailsOverviewComponent', () => {
  let component: StudentDetailsOverviewComponent;
  let fixture: ComponentFixture<StudentDetailsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
