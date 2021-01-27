import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineRoutingModule } from './vending-machine-routing.module';
import { VendingMachineAppComponent } from './components/vending-machine-app.component';
import { SupplyComponent } from './components/supply/supply.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { SupplyState } from './state/supply.state';
import { DialogNotificationBoxComponent } from './components/dialog-notification-box/dialog-notification-box.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendingMachineAppComponent, SupplyComponent, PurchaseComponent, DialogNotificationBoxComponent],
  imports: [
    CommonModule, MaterialModule, FlexLayoutModule, FormsModule, ReactiveFormsModule,
    VendingMachineRoutingModule, NgxsModule.forFeature([SupplyState]),
  ]
})
export class VendingMachineModule { 
  constructor(private readonly store: Store) {
  }
}
