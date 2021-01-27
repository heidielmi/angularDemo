import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IPurchase, purchaseStatus } from '../models/purchase.model';
import { DecreaseSupply } from '../state/supply.actions';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private initialSupply = 1;
  private costForCan = 1.20;
  constructor(private inventoryService: InventoryService) { }

  calculatePayment(amount: number, qty: number): IPurchase {
    const change = amount - (qty * this.costForCan);
    const calculatedChange = Number((Math.round(change * 100) / 100).toFixed(2));
    this.inventoryService.deductSupply(qty);
    return {
      message: "",
      change: calculatedChange,
      purchasedQuantity: qty,
      status: purchaseStatus.success
    } as IPurchase;
  }

  checkSufficientFund(amount: number, qty: number): IPurchase {
    if (amount >= qty * this.costForCan ){
      return {
        message: "",
        status: purchaseStatus.success
      } as IPurchase;
    } else {
      return {
        message: "insufficient money",
        change: amount,
        purchasedQuantity: 0,
        status: purchaseStatus.insufficientMoney
      } as IPurchase;
    }
  }
}
