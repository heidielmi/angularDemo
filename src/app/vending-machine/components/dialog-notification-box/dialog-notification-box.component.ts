import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { modalType } from '../../models/modal-type.model';
export interface DialogData {
  type: modalType;
  message: string;
}
@Component({
  selector: 'app-dialog-notification-box',
  templateUrl: './dialog-notification-box.component.html',
  styleUrls: ['./dialog-notification-box.component.scss']
})
export class DialogNotificationBoxComponent implements OnInit {
  type: string;
  message: string;
  errorModalType = false;
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.errorModalType = (this.data.type === modalType.error);
  }

}
