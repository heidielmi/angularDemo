import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { modalType } from '../../models/modal-type.model';
import { IPurchase, purchaseStatus } from '../../models/purchase.model';
import { InventoryService } from '../../services/inventory.service';
import { PurchaseService } from '../../services/purchase.service';
import { SupplyState } from '../../state/supply.state';
import { DialogNotificationBoxComponent } from '../dialog-notification-box/dialog-notification-box.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  private availableSupplies: number;
  moneyRegx = /^\$?\d+((,\d{3})+)?(\.\d+)?$/;
  qtyRegx = /^-?([1-9]\d*)?$/;
  @Select(SupplyState.getSupplies) getSupplies$: Observable<number>;
  qty = new FormControl('', [Validators.required, Validators.pattern(this.qtyRegx)]);
  amount = new FormControl('', [Validators.required, Validators.pattern(this.moneyRegx)]);
  // purchaseForm: FormGroup;
  
  constructor(private purchaseSrv: PurchaseService,
     private inventorySrv: InventoryService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSupplies$.subscribe((supplies$: number) => {
     debugger;
     this.availableSupplies = supplies$;
    });
  }
  purchase() {
    debugger;
    const qty = Number(this.qty.value);
    const amount = Number(this.amount.value);
    const purchaseResult = this.purchaseCalculation(amount, qty);
    if (purchaseResult.status === purchaseStatus.success) {
      this.openDialog(`You have successfully purchased  ${purchaseResult.purchasedQuantity} can and you have ${purchaseResult.change} change` , modalType.confirmation);
      this.qty.reset();
      this.amount.reset();
    } else if (purchaseResult.status === purchaseStatus.insufficientMoney) {
      this.openDialog("Error, Insufficient money!" , modalType.error);
    } else {
      this.openDialog("Error, Out of stock!" , modalType.error);
    }


  }
  purchaseCalculation(amount: number, qty: number): IPurchase {
    const fundCalculationResult = this.purchaseSrv.checkSufficientFund(amount, qty);
    const supplyCalculationResult = this.inventorySrv.checkStockAvailibility(qty, this.availableSupplies, amount);
     if (fundCalculationResult.status === purchaseStatus.success) {
       if (supplyCalculationResult.status === purchaseStatus.success) {
           const pruchasedResult = this.purchaseSrv.calculatePayment(amount, qty);
           return pruchasedResult;
       }
       else {
        return supplyCalculationResult;
       }

     } else {
      return fundCalculationResult;
     }
  }
  openDialog(msg: string, modaltype: modalType): void {
    const dialogRef = this.dialog.open(DialogNotificationBoxComponent, {
      width: '250px',
      data: {message: msg, type: modaltype}
    });
  }

  getErrorMessage() {
    if (this.qty.hasError('required') || this.amount.hasError('required') ) {
      return 'You must enter a value';
    }
    if (this.qty.hasError('pattern') || this.amount.hasError('pattern') ) {
      return 'You must enter a valid value';
    }
  }

}
