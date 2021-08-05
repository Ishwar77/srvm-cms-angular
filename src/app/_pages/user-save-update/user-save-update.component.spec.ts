import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSaveUpdateComponent } from './user-save-update.component';

describe('UserSaveUpdateComponent', () => {
  let component: UserSaveUpdateComponent;
  let fixture: ComponentFixture<UserSaveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSaveUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
