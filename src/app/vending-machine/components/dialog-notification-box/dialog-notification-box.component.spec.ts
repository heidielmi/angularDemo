import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalType } from '../../models/modal-type.model';

import { DialogNotificationBoxComponent } from './dialog-notification-box.component';

describe('DialogNotificationBoxComponent', () => {
  let component: DialogNotificationBoxComponent;
  let fixture: ComponentFixture<DialogNotificationBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNotificationBoxComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {type: modalType.error} },
        { provide: MatDialogRef, useValue: {} }
    ]
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
  it('should determine type of data to be displayed at the initialization', () => {
    component.ngOnInit();
    expect(component.errorModalType).toBeTruthy();
  });
});
