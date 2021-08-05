import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSaveorUpdateComponent } from './event-saveor-update.component';

describe('EventSaveorUpdateComponent', () => {
  let component: EventSaveorUpdateComponent;
  let fixture: ComponentFixture<EventSaveorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSaveorUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSaveorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
