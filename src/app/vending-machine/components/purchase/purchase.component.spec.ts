import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';
import { IPurchase, purchaseStatus } from '../../models/purchase.model';
import { InventoryService } from '../../services/inventory.service';
import { PurchaseService } from '../../services/purchase.service';

import { PurchaseComponent } from './purchase.component';

describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;
  let dialog: MatDialog;
  const purchaseSpyService = jasmine.createSpyObj('PurchaseService', ['checkSufficientFund', 'calculatePayment']);
  const inventorySpyService = jasmine.createSpyObj('InventoryService', ['checkStockAvailibility']);
  const dialogSpyService = jasmine.createSpyObj('MatDialog', ['open']);
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), MatDialogModule],
      declarations: [ PurchaseComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: PurchaseService, useValue: purchaseSpyService },
        { provide: InventoryService, useValue: inventorySpyService },
        { provide: MatDialog, useValue: dialogSpyService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not allow to purchase when insufficient money', () => {
    let purchaseSrvResult =  {
      message: "insufficient money",
      change: 0,
      purchasedQuantity: 0,
      status: purchaseStatus.insufficientMoney
    } as IPurchase;
    purchaseSpyService.checkSufficientFund.and.returnValue(purchaseSrvResult);
    let inventorySrvResult = Object.assign ( {}, purchaseSrvResult)
    inventorySrvResult.status = purchaseStatus.outOfStock;
    inventorySpyService.checkStockAvailibility.and.returnValue(inventorySrvResult);
    let result = component.purchaseCalculation(2.00, 2);
    expect(result.status).toBe(purchaseStatus.insufficientMoney);
  });
  it('should not allow to purchase with sufficient money but not enough supply', () => {
    let purchaseSrvResult =  {
      message: "insufficient money",
      change: 0,
      purchasedQuantity: 0,
      status: purchaseStatus.success
    } as IPurchase;
    purchaseSpyService.checkSufficientFund.and.returnValue(purchaseSrvResult);
    let inventorySrvResult = Object.assign ( {}, purchaseSrvResult)
    inventorySrvResult.status = purchaseStatus.outOfStock;
    inventorySpyService.checkStockAvailibility.and.returnValue(inventorySrvResult);
    let result = component.purchaseCalculation(2.00, 2);
    expect(result.status).toBe(purchaseStatus.outOfStock);
  });
  it('should allow to purchase with sufficient money and enough supply', () => {
    component.qty.setValue(2);
    component.amount.setValue(1.00);
    let purchaseSrvResult =  {
      message: "insufficient money",
      change: 0,
      purchasedQuantity: 0,
      status: purchaseStatus.success
    } as IPurchase;
    purchaseSpyService.checkSufficientFund.and.returnValue(purchaseSrvResult);
    purchaseSpyService.calculatePayment.and.returnValue(purchaseSrvResult);
    let inventorySrvResult = Object.assign ( {}, purchaseSrvResult)
    inventorySrvResult.status = purchaseStatus.success;
    inventorySpyService.checkStockAvailibility.and.returnValue(inventorySrvResult);
    let result = component.purchaseCalculation(2.00, 2);
    expect(result.status).toBe(purchaseStatus.success);
  });
  it('should allow display successfult msg after a successful perchase', () => {
    component.qty.setValue(1);
    component.amount.setValue(10.00);
    let purchaseSrvResult =  {
      message: "insufficient money",
      change: 0,
      purchasedQuantity: 0,
      status: purchaseStatus.success
    } as IPurchase;
    purchaseSpyService.checkSufficientFund.and.returnValue(purchaseSrvResult);
    purchaseSpyService.calculatePayment.and.returnValue(purchaseSrvResult);
    let inventorySrvResult = Object.assign ( {}, purchaseSrvResult)
    inventorySrvResult.status = purchaseStatus.success;
    inventorySpyService.checkStockAvailibility.and.returnValue(inventorySrvResult);
    dialogSpyService.open.and.callThrough();
    component.purchase();
    expect(dialogSpyService.open).toHaveBeenCalled();
  });
});
