import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { InventoryService } from './inventory.service';
import { AppConfig } from 'src/app/shared/services/app-config.service';
import { PurchaseService } from './purchase.service';
import { purchaseStatus } from '../models/purchase.model';

describe('PurchaseService', () => {
  let service: PurchaseService;
  const inventorySpyService = jasmine.createSpyObj('InventoryService', ['deductSupply']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
      providers: [
        { provide: InventoryService, useValue: inventorySpyService }]
    });
    service = TestBed.inject(PurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should calculate payment change', () => {
    service.costForCan = 1.20;
    inventorySpyService.deductSupply.and.callThrough();
    let result = service.calculatePayment(2, 1);
    expect(result.change).toBe(0.8);
    expect(result.purchasedQuantity).toBe(1);
    expect(inventorySpyService.deductSupply).toHaveBeenCalled();
    expect(result.status).toBe(purchaseStatus.success);
  });
  it('should calculate if there is suffitient fund', () => {
    service.costForCan = 1.20;
    let result = service.checkSufficientFund(2, 1);
    expect(result.status).toBe(purchaseStatus.success);
    result = service.checkSufficientFund(2, 4);
    expect(result.status).toBe(purchaseStatus.insufficientMoney);
  });
});
