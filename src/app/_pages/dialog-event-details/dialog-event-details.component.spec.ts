import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEventDetailsComponent } from './dialog-event-details.component';

describe('DialogEventDetailsComponent', () => {
  let component: DialogEventDetailsComponent;
  let fixture: ComponentFixture<DialogEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEventDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
