import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IPurchase, purchaseStatus } from '../models/purchase.model';
import { DecreaseSupply, IncreaseSupply } from '../state/supply.actions';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private store: Store) { }

  addSupply(qty: number) {
    this.store.dispatch(new IncreaseSupply(qty));
  }

  deductSupply(qty: number) {
    this.store.dispatch(new DecreaseSupply(qty));
  }

  checkStockAvailibility(qty: number, availableSupplies: number, amount: number): IPurchase {
    if( availableSupplies >= qty ){
      return {
        message: "",
        status: purchaseStatus.success
      } as IPurchase;
    } else {
      return {
        message: "Out of stock",
        change: amount,
        purchasedQuantity: 0,
        status: purchaseStatus.outOfStock
      } as IPurchase;
    }
  }


}
