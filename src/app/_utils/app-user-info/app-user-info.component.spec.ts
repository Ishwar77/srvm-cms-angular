import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserInfoComponent } from './app-user-info.component';

describe('AppUserInfoComponent', () => {
  let component: AppUserInfoComponent;
  let fixture: ComponentFixture<AppUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
