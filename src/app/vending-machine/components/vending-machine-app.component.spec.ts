import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { VendingMachineAppComponent } from './vending-machine-app.component';
class MockRouter {
  events = of("test")
}
describe('VendingMachineAppComponent', () => {
  let component: VendingMachineAppComponent;
  let fixture: ComponentFixture<VendingMachineAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingMachineAppComponent ],
      providers: [{
        provide: Router,
        useClass: MockRouter
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
