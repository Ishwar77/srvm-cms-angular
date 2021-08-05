import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateUpdateComponent } from './donate-update.component';

describe('DonateUpdateComponent', () => {
  let component: DonateUpdateComponent;
  let fixture: ComponentFixture<DonateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
