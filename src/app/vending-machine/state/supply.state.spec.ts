import { Store, NgxsModule } from "@ngxs/store";
import { SupplyState } from "./supply.state";
import { TestBed } from "@angular/core/testing";
import { IncreaseSupply, DecreaseSupply } from "./supply.actions";
export const SOME_DESIRED_STATE = {
    supply: 1
};
describe("AdminState", () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([SupplyState])]
        });
        store = TestBed.inject(Store);
        store.reset({
            ...store.snapshot(),
            inventory: SOME_DESIRED_STATE
        });
    });




    it("should return initial supplies", () => {
        const supply = store.selectSnapshot(state => state.inventory.supply);
        expect(supply).toEqual(1);
    });

    it("should add to supply quantities", () => {
        store.dispatch(new IncreaseSupply(6));
        const supplyQty = store.selectSnapshot(state => state.inventory.supply);
        expect(supplyQty).toBe(7);
    });

    it("should deduct from supply quantities", () => {
        store.dispatch(new DecreaseSupply(1));
        const supplyQty = store.selectSnapshot(state => state.inventory.supply);
        expect(supplyQty).toBe(0);
    });

});

