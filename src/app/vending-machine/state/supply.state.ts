import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DecreaseSupply, IncreaseSupply } from "./supply.actions";

export class SupplyStateModel {
    supply: number;
}

@State<SupplyStateModel>({
    name: "inventory",
    defaults: {
        supply: 1
    }
})
@Injectable()
export class SupplyState {
    constructor() { }

    @Selector()
    static getSupplies(state: SupplyStateModel) {
        return state.supply;
    }

    @Action(IncreaseSupply)
    IncreaseSupply(ctx: StateContext<SupplyStateModel>, action: IncreaseSupply) {
        const state = ctx.getState();
        const newSupply = state.supply + action.payload;
        ctx.patchState({
            supply: newSupply
        });
    }

    @Action(DecreaseSupply)
    DecreaseSupply(ctx: StateContext<SupplyStateModel>, action: DecreaseSupply) {
        const state = ctx.getState();
        const newCalculatedSupply = (state.supply > action.payload) ? state.supply - action.payload : 0;
        ctx.patchState({
            supply: newCalculatedSupply
        });
    }
}