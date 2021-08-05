import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySaveUpdateComponent } from './history-save-update.component';

describe('HistorySaveUpdateComponent', () => {
  let component: HistorySaveUpdateComponent;
  let fixture: ComponentFixture<HistorySaveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySaveUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySaveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
