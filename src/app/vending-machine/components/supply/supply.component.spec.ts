import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';
import { InventoryService } from '../../services/inventory.service';

import { SupplyComponent } from './supply.component';

describe('SupplyComponent', () => {
  let component: SupplyComponent;
  let fixture: ComponentFixture<SupplyComponent>;
  const inventorySpyService = jasmine.createSpyObj('InventoryService', ['addSupply']);
  const dialogSpyService = jasmine.createSpyObj('MatDialog', ['open']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), MatDialogModule],
      declarations: [ SupplyComponent ],
      providers: [
        { provide: InventoryService, useValue: inventorySpyService },
        { provide: MatDialog, useValue: dialogSpyService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should supply the entered quantity and show the confirmation madal box', () => {
    component.qty.setValue(2);
    inventorySpyService.addSupply.and.callThrough();
    component.supply();
    expect(inventorySpyService.addSupply).toHaveBeenCalled();
    expect(dialogSpyService.open).toHaveBeenCalled();
  });
});
