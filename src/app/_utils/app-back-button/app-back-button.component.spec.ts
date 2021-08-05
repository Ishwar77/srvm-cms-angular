import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBackButtonComponent } from './app-back-button.component';

describe('AppBackButtonComponent', () => {
  let component: AppBackButtonComponent;
  let fixture: ComponentFixture<AppBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBackButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
