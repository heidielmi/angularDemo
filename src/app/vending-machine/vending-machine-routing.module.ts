import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { SupplyComponent } from './components/supply/supply.component';
import { VendingMachineAppComponent } from './components/vending-machine-app.component';


const routes: Routes = [
  { path: "" , component: VendingMachineAppComponent, children: [
    { path: "" , component: PurchaseComponent },
    { path: "purchase" , component: PurchaseComponent },
    { path: "supply" , component: SupplyComponent }]},
  { path: "**" , redirectTo: ""}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendingMachineRoutingModule { }
