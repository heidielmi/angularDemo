import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotificationBoxComponent } from './dialog-notification-box.component';

describe('DialogNotificationBoxComponent', () => {
  let component: DialogNotificationBoxComponent;
  let fixture: ComponentFixture<DialogNotificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNotificationBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNotificationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
