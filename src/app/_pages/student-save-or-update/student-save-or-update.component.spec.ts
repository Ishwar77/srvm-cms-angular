import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSaveOrUpdateComponent } from './student-save-or-update.component';

describe('StudentSaveOrUpdateComponent', () => {
  let component: StudentSaveOrUpdateComponent;
  let fixture: ComponentFixture<StudentSaveOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSaveOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSaveOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
