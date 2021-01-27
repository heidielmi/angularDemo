import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { modalType } from '../../models/modal-type.model';
import { InventoryService } from '../../services/inventory.service';
import { DialogNotificationBoxComponent } from '../dialog-notification-box/dialog-notification-box.component';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {
  qtyRegx = /^-?([1-9]\d*)?$/;
  qty = new FormControl('', [Validators.required, Validators.pattern(this.qtyRegx)]);
  
  constructor(
     private inventorySrv: InventoryService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  supply() {
    const qty = Number(this.qty.value);
    this.inventorySrv.addSupply(qty);
    this.openDialog(`Resupplied with ${qty} can(s)` , modalType.confirmation);
  }
  openDialog(msg: string, modaltype: modalType): void {
    const dialogRef = this.dialog.open(DialogNotificationBoxComponent, {
      width: '250px',
      data: {message: msg, type: modaltype}
    });
  }
  getErrorMessage() {
    if (this.qty.hasError('required') ) {
      return 'You must enter a value';
    }
    if (this.qty.hasError('pattern')) {
      return 'You must enter a valid value';
    }
  }

}
