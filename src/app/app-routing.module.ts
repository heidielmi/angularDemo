import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  { path: "" , component: LandingPageComponent},
  { path: "vendingmachine", loadChildren: () => import("./vending-machine/vending-machine.module")
                                                .then(m => m.VendingMachineModule)}, 
   { path: "**" , redirectTo: ""}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
