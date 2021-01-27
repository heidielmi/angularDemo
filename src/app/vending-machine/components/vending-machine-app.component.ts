import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, BreakpointState }  from "@angular/cdk/layout"
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vending-machine-app',
  templateUrl: './vending-machine-app.component.html',
  styleUrls: ['./vending-machine-app.component.scss']
})
export class VendingMachineAppComponent implements OnInit {
  isSmallScreen: boolean;
  @ViewChild(MatDrawer) sidenav: MatDrawer;
  constructor(private breakPointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    this.breakPointObserver.observe(["(min-width: 770px)"])
    .subscribe((state: BreakpointState) => {
      this.isSmallScreen = !state.matches;
    });
    this.router.events.subscribe((event) => {
      if ( this.isSmallScreen) {
        this.sidenav.close();
      }
   });
  }

}
